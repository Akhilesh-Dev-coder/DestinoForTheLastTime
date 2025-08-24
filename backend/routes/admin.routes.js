// routes/admin.routes.js
const db = require('../configs/database');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

/**
 * Admin Login (Plain Text Password)
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Fetch admin from DB
    const admin = await db('admin').where({ email }).first();

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found',
      });
    }

    // ✅ Plain text password comparison (NO bcrypt)
    if (password !== admin.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // ✅ Send success response with token
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
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      err: error.message,
    });
  }
});

module.exports = router;