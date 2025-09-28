// routes/auth.routes.js
const db = require('../configs/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

// 🔒 Import audit logger
const logAudit = require('../utils/auditLogger');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All Fields are required',
      });
    }

    const existingUser = await db('user_creds').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exist',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUserId] = await db('user_creds').insert({
      username,
      email,
      password: hashedPassword,
    });

    // 🔒 Log audit: User Signup
    await logAudit({
      userId: newUserId,
      username: email,
      action: 'User Signup',
      details: { username, email },
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown'
    });

    const token = jwt.sign(
      { id: newUserId, email, username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: { id: newUserId, username, email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error Occurred',
      err: error.message,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const user = await db('user_creds').where({ email }).first();
    if (!user) {
      // 🔒 Log failed login attempt
      await logAudit({
        username: email,
        action: 'Failed Login Attempt',
        details: { reason: 'User not found' },
        ipAddress: req.ip || req.connection.remoteAddress || 'unknown'
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // 🔒 Log failed login attempt
      await logAudit({
        userId: user.user_id,
        username: email,
        action: 'Failed Login Attempt',
        details: { reason: 'Incorrect password' },
        ipAddress: req.ip || req.connection.remoteAddress || 'unknown'
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { id: user.user_id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 🔒 Log successful login
    await logAudit({
      userId: user.user_id,
      username: email,
      action: 'User Login',
      details: { userAgent: req.get('User-Agent') },
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown'
    });

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error Occurred',
      err: error.message,
    });
  }
});

router.get('/verify-token', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Invalid token format' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      decoded,
    });
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
});

module.exports = router;