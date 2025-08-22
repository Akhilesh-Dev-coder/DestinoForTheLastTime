require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('./db'); // your MySQL connection

const app = express();

/* --------------------------- CORS (production-safe) --------------------------- */
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080/';
const useStrictCors = !!FRONTEND_URL;
app.use(
  cors(
    useStrictCors
      ? { origin: "FRONTEND_URL.split(',')", credentials: true }
      : { origin: '*', credentials: false }
    
  )
);
app.use(express.json());

/* ------------------------- DB: use ENV + connection pool ---------------------- */
const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'travel_planner',
  },
  pool: { min: 2, max: 10 },
});

/* ------------------------------ Helpers / Utils ------------------------------- */

const OPENTRIPMAP_API_KEY =
  process.env.OPENTRIPMAP_API_KEY ||
  '5ae2e3f221c38a28845f05b6fd324eada2f24f8638f6f07991f778b5';

// Haversine distance in KM
function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Estimate time by mode using average speeds
function estimateTimeByMode(distanceKm, mode) {
  const speeds = { car: 60, train: 90, flight: 700 }; // km/h rough averages
  const v = speeds[mode] || 60;
  const hours = distanceKm / v;
  if (!isFinite(hours)) return 'N/A';
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

// Geocode a city to lat/lon via OpenTripMap Geoname API
async function geocodeCity(city) {
  if (!city) return null;
  try {
    const url = `https://api.opentripmap.com/0.1/en/places/geoname`;
    const { data } = await axios.get(url, {
      params: { name: city, apikey: OPENTRIPMAP_API_KEY },
    });
    if (data && data.lat && data.lon) return { lat: data.lat, lon: data.lon, name: data.name || city };
    return null;
  } catch {
    return null;
  }
}

// Weather (Open-Meteo) – returns current conditions
async function getWeather({ city, lat, lon }) {
  try {
    let coords = { lat, lon };
    if ((!lat || !lon) && city) {
      coords = await geocodeCity(city);
    }
    if (!coords || !coords.lat || !coords.lon) return null;

    const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: coords.lat,
        longitude: coords.lon,
        current_weather: true,
        temperature_unit: 'celsius',
        windspeed_unit: 'kmh',
        timezone: 'auto',
      },
    });

    const cw = data?.current_weather;
    if (!cw) return null;

    const codeMap = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail',
    };

    return {
      location: city || null,
      temp_c: cw.temperature,
      wind_kph: cw.windspeed,
      wind_dir: cw.winddirection,
      description: codeMap[cw.weathercode] || 'Unknown',
      time: cw.time,
      provider: 'Open-Meteo',
    };
  } catch {
    return null;
  }
}

// Nearby places via OpenTripMap (hotels/restaurants/attractions)
async function getNearbyPlaces({ lat, lon, kind, radius = 5000, limit = 10 }) {
  if (!OPENTRIPMAP_API_KEY || !lat || !lon) return [];
  try {
    const { data } = await axios.get(
      'https://api.opentripmap.com/0.1/en/places/radius',
      {
        params: {
          radius,
          lon,
          lat,
          kinds: kind, // 'hotels', 'restaurants', 'interesting_places'
          limit,
          rate: 2,
          format: 'json',
          apikey: OPENTRIPMAP_API_KEY,
        },
      }
    );
    return (data || [])
      .map((p) => ({
        name: p.name,
        dist_m: p.dist,
        kinds: p.kinds,
        xid: p.xid,
      }))
      .filter((p) => !!p.name);
  } catch {
    return [];
  }
}

// JWT helpers
function signJwt(payload, expires = '2h') {
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  return jwt.sign(payload, secret, { expiresIn: expires });
}
function verifyJwt(token) {
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  return jwt.verify(token, secret);
}

/* ------------------------------ AUTH ROUTES ---------------------------------- */

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ success: false, message: 'Name, email, and password are required' });
  }
  try {
    const existing = await db('user_creds').where({ email }).first();
    if (existing) return res.status(409).json({ success: false, message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const [user_id] = await db('user_creds').insert({
      name,
      email,
      password: hashed,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    });

    const token = signJwt({ user_id, role: 'user' }, '2h');
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { user_id, name, email },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Registration error', error: error.message });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  try {
    const user = await db('user_creds').where({ email }).first();
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const token = signJwt({ user_id: user.user_id, role: 'user' }, '2h');
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { user_id: user.user_id, email: user.email, name: user.name || null },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Login error', error: error.message });
  }
});

// RESET PASSWORD
app.post('/api/auth/reset-password', async (req, res) => {
  const { email, newPassword } = req.body || {};
  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  try {
    const user = await db('user_creds').where({ email }).first();
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db('user_creds').where({ email }).update({
      password: hashed,
      updated_at: db.fn.now(),
    });

    return res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

/* ------------------------------ USER MIDDLEWARE ------------------------------ */
function verifyUserToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ success: false, message: 'No token provided' });
  const token = header.split(' ')[1];
  try {
    const decoded = verifyJwt(token);
    if (decoded.role !== 'user' && decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

/* ------------------------------- TRIP ROUTES --------------------------------- */

// CREATE trip
app.post('/api/trips', verifyUserToken, async (req, res) => {
  const { user_id, destination, startDate, endDate, budget, transport } = req.body || {};
  if (!user_id || !destination || !transport) {
    return res.status(400).json({ success: false, message: 'user_id, destination and transport are required' });
  }
  try {
    const [tripId] = await db('trips').insert({
      user_id,
      destination,
      start_date: startDate || null,
      end_date: endDate || null,
      budget: budget || null,
      transport: JSON.stringify(transport),
      created_at: db.fn.now(),
    });
    return res.status(201).json({ success: true, tripId });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create trip', error: err.message });
  }
});

// READ trips for a user
app.get('/api/trips/:user_id', verifyUserToken, async (req, res) => {
  const { user_id } = req.params;
  try {
    const trips = await db('trips').where({ user_id });
    return res.status(200).json({ success: true, trips });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch trips', error: err.message });
  }
});

// DELETE a trip and its activities
app.delete('/api/trips/:trip_id', verifyUserToken, async (req, res) => {
  const { trip_id } = req.params;
  try {
    await db('activities').where({ trip_id }).del();
    await db('trips').where({ id: trip_id }).del();
    return res.status(200).json({ success: true, message: 'Trip deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete trip', error: err.message });
  }
});

/* ---------- Trip details (distance/time/weather/nearby places) ---------- */
/**
 * GET /api/trips/:tripId/details?originLat=..&originLon=..&mode=car
 */
app.get('/api/trips/:tripId/details', verifyUserToken, async (req, res) => {
  const { tripId } = req.params;
  const { originLat, originLon, mode = 'car' } = req.query;
  try {
    const trip = await db('trips').where({ id: tripId }).first();
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    // Geocode destination to get lat/lon
    const destCoords = await geocodeCity(trip.destination);

    // Weather (Open-Meteo)
    const weather = await getWeather(
      destCoords ? { lat: destCoords.lat, lon: destCoords.lon } : { city: trip.destination }
    );

    // Nearby (only if we have coords)
    let hotels = [], restaurants = [], attractions = [];
    if (destCoords) {
      hotels = await getNearbyPlaces({ lat: destCoords.lat, lon: destCoords.lon, kind: 'hotels' });
      restaurants = await getNearbyPlaces({ lat: destCoords.lat, lon: destCoords.lon, kind: 'restaurants' });
      attractions = await getNearbyPlaces({
        lat: destCoords.lat,
        lon: destCoords.lon,
        kind: 'interesting_places',
      });
    }

    // Distance + time (if origin provided and dest coords available)
    let distance_km = null;
    let time_estimate = null;
    if (originLat && originLon && destCoords) {
      distance_km = Number(
        haversineKm(Number(originLat), Number(originLon), Number(destCoords.lat), Number(destCoords.lon)).toFixed(2)
      );
      // prefer explicit mode from querystring
      time_estimate = estimateTimeByMode(distance_km, mode);
    }

    return res.json({
      success: true,
      trip: {
        id: trip.id,
        destination: trip.destination,
        start_date: trip.start_date,
        end_date: trip.end_date,
        budget: trip.budget,
        transport: trip.transport,
      },
      travel: { distance_km, time_estimate, mode },
      weather,
      nearby: { hotels, restaurants, attractions },
      coords: destCoords || null,
      notes: {
        info_source: 'Open-Meteo + OpenTripMap + Haversine',
        tip: !OPENTRIPMAP_API_KEY ? 'Set OPENTRIPMAP_API_KEY to enable nearby and geocoding.' : undefined,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch trip details', error: err.message });
  }
});

/* ----------------------------- ACTIVITIES ROUTES ------------------------------ */

// Get all activities by user ID
app.get('/api/user-activities/:user_id', verifyUserToken, async (req, res) => {
  const { user_id } = req.params;
  try {
    const activities = await db('activities')
      .join('trips', 'activities.trip_id', 'trips.id')
      .where('trips.user_id', user_id)
      .select(
        'activities.id',
        'activities.activity',
        'activities.date',
        'activities.time',
        'activities.location',
        'activities.notes',
        'activities.estimated_cost',
        'trips.destination'
      );
    return res.status(200).json({ success: true, activities });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch activities', error: err.message });
  }
});

// ADD activity
app.post('/api/activities', verifyUserToken, async (req, res) => {
  const { trip_id, date, time, activity, location, notes, estimated_cost } = req.body || {};
  if (!trip_id || !activity) {
    return res.status(400).json({ success: false, message: 'trip_id and activity are required' });
  }
  try {
    const [id] = await db('activities').insert({
      trip_id,
      date: date || null,
      time: time || null,
      activity: activity || null,
      location: location || null,
      notes: notes || null,
      estimated_cost: estimated_cost || null,
    });
    return res.status(201).json({ success: true, activityId: id });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to add activity', error: err.message });
  }
});

// READ activities for a trip
app.get('/api/activities/:trip_id', verifyUserToken, async (req, res) => {
  const { trip_id } = req.params;
  try {
    const activities = await db('activities').where({ trip_id });
    return res.status(200).json({ success: true, activities });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to get activities', error: err.message });
  }
});

// DELETE activity
app.delete('/api/activities/:activity_id', verifyUserToken, async (req, res) => {
  const { activity_id } = req.params;
  try {
    await db('activities').where({ id: activity_id }).del();
    return res.status(200).json({ success: true, message: 'Activity deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete activity', error: err.message });
  }
});

// UPDATE activity
app.put('/api/activities/:activity_id', verifyUserToken, async (req, res) => {
  const { activity_id } = req.params;
  const { date, time, activity, location, notes, estimated_cost } = req.body || {};
  try {
    await db('activities').where({ id: activity_id }).update({
      date: date || null,
      time: time || null,
      activity: activity || null,
      location: location || null,
      notes: notes || null,
      estimated_cost: estimated_cost || null,
    });
    return res.status(200).json({ success: true, message: 'Activity updated' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update activity', error: err.message });
  }
});

/* ------------------------------ ADMIN ENDPOINTS ------------------------------- */

// Admin login (expects an `admin` table with columns: id, name, email, password[hash])
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body || {};
  try {
    const admin = await db('admin').where({ email }).first();
    if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    if (admin.password && !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signJwt({ id: admin.id, role: 'admin' }, '2h');
    return res.json({
      success: true,
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Admin login error' });
  }
});

function verifyAdminToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyJwt(token);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: Not an admin' });
    }
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

// Admin dashboard stats
app.get('/api/admin/dashboard', verifyAdminToken, async (req, res) => {
  try {
    const userCount = await db('user_creds').count('user_id as total').first();
    const tripCount = await db('trips').count('id as total').first();
    const activityCount = await db('activities').count('id as total').first();

    return res.json({
      success: true,
      stats: {
        users: Number(userCount?.total || 0),
        trips: Number(tripCount?.total || 0),
        activities: Number(activityCount?.total || 0),
      },
    });
  } catch {
    return res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
});

// Admin: users
app.get('/api/admin/users', verifyAdminToken, async (req, res) => {
  try {
    const users = await db('user_creds').select('user_id', 'name', 'email');
    return res.json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Users fetch error', error: err.message });
  }
});

app.post('/api/admin/users', verifyAdminToken, async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  try {
    const existingUser = await db('user_creds').where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user_id] = await db('user_creds').insert({
      name,
      email,
      password: hashedPassword,
      created_at: db.fn.now(),
      updated_at: db.fn.now(),
    });
    return res.status(201).json({ success: true, user: { user_id, name, email } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error creating user', error: err.message });
  }
});

app.put('/api/admin/users/:user_id', verifyAdminToken, async (req, res) => {
  const { user_id } = req.params;
  const { name, email, password } = req.body || {};
  try {
    const updateData = { updated_at: db.fn.now() };
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    await db('user_creds').where({ user_id }).update(updateData);
    return res.json({ success: true, message: 'User updated' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update user', error: err.message });
  }
});

app.delete('/api/admin/users/:user_id', verifyAdminToken, async (req, res) => {
  const { user_id } = req.params;
  try {
    await db('user_creds').where({ user_id }).del();
    return res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete user', error: err.message });
  }
});

// Admin: trips
app.get('/api/admin/trips', verifyAdminToken, async (req, res) => {
  try {
    const trips = await db('trips').select('*');
    return res.json({ success: true, trips });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Trips fetch error', error: err.message });
  }
});

app.delete('/api/admin/trips/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db('activities').where({ trip_id: id }).del();
    await db('trips').where({ id }).del();
    return res.json({ success: true, message: 'Trip deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete trip', error: err.message });
  }
});

// Admin: activities
app.get('/api/admin/activities', verifyAdminToken, async (req, res) => {
  try {
    const activities = await db('activities').select('*');
    return res.json({ success: true, activities });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Activities fetch error', error: err.message });
  }
});

app.get('/api/activities', verifyAdminToken, async (req, res) => {
  try {
    const acts = await db('activities')
      .join('trips', 'activities.trip_id', 'trips.id')
      .join('user_creds', 'trips.user_id', 'user_creds.user_id')
      .select(
        'activities.id',
        'activities.activity',
        'activities.date',
        'activities.time',
        'activities.location',
        'activities.notes',
        'activities.estimated_cost',
        'trips.id as trip_id',
        'trips.destination',
        'user_creds.user_id as user_id',
        'user_creds.email as user_email'
      );
    return res.json({ success: true, activities: acts });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Activities fetch error', error: err.message });
  }
});

app.delete('/api/admin/activities/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db('activities').where({ id }).del();
    return res.status(200).json({ success: true, message: 'Activity deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete activity', error: err.message });
  }
});

// Admin stats (duplicate-safe)
app.get('/api/admin/stats', verifyAdminToken, async (req, res) => {
  try {
    const usersCountResult = await db('user_creds').count('user_id as count').first();
    const tripsCountResult = await db('trips').count('id as count').first();
    const activitiesCountResult = await db('activities').count('id as count').first();
    return res.json({
      success: true,
      stats: {
        users: Number(usersCountResult?.count || 0),
        trips: Number(tripsCountResult?.count || 0),
        activities: Number(activitiesCountResult?.count || 0),
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch stats', error: err.message });
  }
});

/* ------------------- Standalone destination info endpoint -------------------- */
/**
 * GET /api/destination-info?city=Paris
 * Optional: &lat=..&lon=..
 */
app.get('/api/destination-info', async (req, res) => {
  const { city, lat, lon } = req.query;
  try {
    let coords = null;
    if (lat && lon) {
      coords = { lat: Number(lat), lon: Number(lon) };
    } else if (city) {
      coords = await geocodeCity(city);
    }

    const weather = await getWeather(coords ? { lat: coords.lat, lon: coords.lon } : { city });

    let hotels = [], restaurants = [], attractions = [];
    if (coords) {
      hotels = await getNearbyPlaces({ lat: coords.lat, lon: coords.lon, kind: 'hotels' });
      restaurants = await getNearbyPlaces({ lat: coords.lat, lon: coords.lon, kind: 'restaurants' });
      attractions = await getNearbyPlaces({
        lat: coords.lat,
        lon: coords.lon,
        kind: 'interesting_places',
      });
    }

    return res.json({
      success: true,
      weather,
      nearby: { hotels, restaurants, attractions },
      coords: coords || null,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch info', error: err.message });
  }
});

// Forgot Password Route
router.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    // Check if user exists
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) return res.status(404).json({ error: 'User not found' });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`; // Update with frontend URL

    // Save token in DB (optional: with expiry)
    await db.query('UPDATE users SET reset_token = ? WHERE email = ?', [resetToken, email]);

    // Send email (using nodemailer - configure with SMTP)
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or your SMTP provider
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${resetLink}`
    });

    return res.json({ message: 'Reset email sent successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});


/* --------------------------------- START ------------------------------------- */
const PORT = process.env.PORT || 1833;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
