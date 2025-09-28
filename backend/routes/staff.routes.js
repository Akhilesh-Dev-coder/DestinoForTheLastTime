// routes/staff.routes.js
const db = require('../configs/database');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

// 🔐 Staff Auth Middleware
const authenticateStaff = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.staff = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

// ✅ Staff Login (Plain-text password)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const staff = await db('staff').where({ email, password }).first();
    if (!staff) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: staff.id, email: staff.email, name: staff.name, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      success: true,
      token,
      staff: {
        id: staff.id,
        name: staff.name,
        email: staff.email,
        role: staff.role
      }
    });
  } catch (err) {
    console.error('Staff login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// 🔐 Protect all routes below
router.use(authenticateStaff);

// ✅ Get all content
router.get('/content', async (req, res) => {
  try {
    const travel = await db('travel_info').select('*');
    const hotels = await db('hotels').select('*');
    const restaurants = await db('restaurants').select('*');
    const attractions = await db('attractions').select('*');
    const queries = await db('user_queries').select('*');
    res.json({
      success: true,
      data: {
        travel,
        hotels,
        restaurants,
        attractions,
        queries
      }
    });
    
  } catch (err) {
    console.error('Error fetching content:', err);
    res.status(500).json({ success: false, message: 'Failed to load content' });
  }
});

// ✅ Update item
router.put('/content/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  const allowed = ['travel_info', 'hotels', 'restaurants', 'attractions', 'user_queries'];
  if (!allowed.includes(table)) {
    return res.status(400).json({ success: false, message: 'Invalid table name' });
  }
  try {
    const updated = await db(table).where({ id }).update(req.body);
    if (updated === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, message: 'Item updated successfully' });
  } catch (err) {
    console.error(`Error updating ${table}:`, err);
    res.status(500).json({ success: false, message: 'Update failed' });
  }
});

// ✅ Create item
router.post('/content/:table', async (req, res) => {
  const { table } = req.params;
  const allowed = ['travel_info', 'hotels', 'restaurants', 'attractions'];
  if (!allowed.includes(table)) {
    return res.status(400).json({ success: false, message: 'Invalid table for creation' });
  }
  try {
    const [newId] = await db(table).insert(req.body);
    res.status(201).json({ success: true, id: newId, message: 'Item created successfully' });
  } catch (err) {
    console.error(`Error creating in ${table}:`, err);
    res.status(500).json({ success: false, message: 'Create failed' });
  }
});

// ✅ Delete item
router.delete('/content/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  const allowed = ['travel_info', 'hotels', 'restaurants', 'attractions'];
  if (!allowed.includes(table)) {
    return res.status(400).json({ success: false, message: 'Invalid table for deletion' });
  }
  try {
    const deleted = await db(table).where({ id }).del();
    if (deleted === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (err) {
    console.error(`Error deleting from ${table}:`, err);
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});

module.exports = router;