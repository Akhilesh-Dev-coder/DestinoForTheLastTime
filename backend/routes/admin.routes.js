// routes/admin.routes.js
const db = require('../configs/database');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

// 🔐 Admin Auth Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// ✅ Admin Login (Plain text comparison)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const admin = await db('admin').where({ email }).first();
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Admin not found' });
    }

    // Plain text comparison (⚠️ only for internal use)
    if (password !== admin.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Admin logged in successfully',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Server error', err: error.message });
  }
});

// 🔐 Protect all following routes
router.use(authenticateAdmin);

// ✅ Get all users
router.get('/get-users', async (req, res) => {
  try {
    const users = await db('user_creds').select('user_id', 'username', 'email');
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching users', err: error.message });
  }
});

// ✅ Get single user
router.get('/get-user/:id', async (req, res) => {
  try {
    const user = await db('user_creds').where({ id: req.params.id }).first();
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching user', err: error.message });
  }
});

// ✅ Update user
router.put('/edit-user/:id', async (req, res) => {
  try {
    const { username, email } = req.body;
    const updated = await db('user_creds').where({ id: req.params.id }).update({ username, email });
    if (!updated) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating user', err: error.message });
  }
});

// ✅ Delete user
router.delete('/delete-user/:id', async (req, res) => {
  try {
    const deleted = await db('user_creds').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting user', err: error.message });
  }
});

// ✅ Create user
router.post('/create-user', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existing = await db('user_creds').where({ email }).first();
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const hashedPassword = await require('bcrypt').hash(password, 10);
    const [newUserId] = await db('user_creds').insert({ username, email, password: hashedPassword });

    res.status(201).json({ success: true, message: 'User created successfully', user_id: newUserId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating user', err: error.message });
  }
});

module.exports = router;