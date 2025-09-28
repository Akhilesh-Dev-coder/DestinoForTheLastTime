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

// 🔒 Audit Logger Helper
const logAudit = async ({ userId = null, username, action, details = '', ipAddress = 'unknown' }) => {
  try {
    await db('audit_logs').insert({
      user_id: userId,
      username,
      action,
      details: JSON.stringify(details),
      ip_address: ipAddress
    });
  } catch (err) {
    console.error('Failed to log audit:', err);
  }
};

// ✅ PUBLIC: Admin Login (NO auth middleware!)
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

    // ⚠️ Plain text password comparison (as per your setup)
    if (password !== admin.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, username: admin.username },
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
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ PUBLIC: Save user feedback (no auth needed)
router.post('/save-feedback', async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    
    if (!name || !email || !feedback) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const [newFeedbackId] = await db('feedback').insert({
      name: name.trim(),
      email: email.trim(),
      message: feedback.trim()
    });

    res.status(201).json({ 
      success: true, 
      message: 'Feedback saved successfully'
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ success: false, message: 'Error saving feedback' });
  }
});

// 🔐 Protect all routes below
router.use(authenticateAdmin);

// ✅ Get all feedback (admin only)
router.get('/get-feedback', async (req, res) => {
  try {
    const feedbackList = await db('feedback')
      .select('*')
      .orderBy('created_at', 'desc');
      
    res.status(200).json({ 
      success: true, 
      feedback: feedbackList 
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ success: false, message: 'Error fetching feedback' });
  }
});

// ✅ Delete feedback (admin only)
router.delete('/delete-feedback/:id', async (req, res) => {
  try {
    const deleted = await db('feedback').where({ id: req.params.id }).del();
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }

    await logAudit({
      userId: req.admin.id,
      username: req.admin.email,
      action: 'Delete Feedback',
      details: { feedbackId: req.params.id },
      ipAddress: req.ip || req.connection.remoteAddress
    });

    res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ success: false, message: 'Error deleting feedback' });
  }
});

// ✅ Get all users
router.get('/get-users', async (req, res) => {
  try {
    const users = await db('user_creds').select('user_id', 'username', 'email');
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

// ✅ Get single user
router.get('/get-user/:id', async (req, res) => {
  try {
    const user = await db('user_creds').where({ user_id: req.params.id }).first();
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
});

// ✅ Update user
router.put('/edit-user/:id', async (req, res) => {
  try {
    const { username, email } = req.body;
    const updated = await db('user_creds').where({ user_id: req.params.id }).update({ username, email });
    if (!updated) return res.status(404).json({ success: false, message: 'User not found' });

    await logAudit({
      userId: req.admin.id,
      username: req.admin.email,
      action: 'Edit User',
      details: { targetUserId: req.params.id, newEmail: email, newUsername: username },
      ipAddress: req.ip || req.connection.remoteAddress
    });

    res.status(200).json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error updating user' });
  }
});

// ✅ Delete user
router.delete('/delete-user/:id', async (req, res) => {
  try {
    const user = await db('user_creds').where({ user_id: req.params.id }).first();
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const deleted = await db('user_creds').where({ user_id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ success: false, message: 'User not found' });

    await logAudit({
      userId: req.admin.id,
      username: req.admin.email,
      action: 'Delete User',
      details: { deletedUserId: req.params.id, deletedUserEmail: user.email },
      ipAddress: req.ip || req.connection.remoteAddress
    });

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
});

// ✅ Suspend / Activate User
router.put('/toggle-user-status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.params.id;

    const user = await db('user_creds').where({ user_id: userId }).first();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await db('user_creds').where({ user_id: userId }).update({ 
      status: status === 'Active' ? 'Active' : 'Suspended'
    });

    await logAudit({
      userId: req.admin.id,
      username: req.admin.email,
      action: status === 'Active' ? 'Activate User' : 'Suspend User',
      details: { targetUserId: userId, targetUserEmail: user.email, newStatus: status },
      ipAddress: req.ip || req.connection.remoteAddress
    });

    res.json({ success: true, message: `User ${status === 'Active' ? 'activated' : 'suspended'} successfully` });
  } catch (error) {
    console.error('Toggle status error:', error);
    res.status(500).json({ success: false, message: 'Error updating user status' });
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

    await logAudit({
      userId: req.admin.id,
      username: req.admin.email,
      action: 'Create User',
      details: { newUserId, newEmail: email },
      ipAddress: req.ip || req.connection.remoteAddress
    });

    res.status(201).json({ success: true, message: 'User created successfully', user_id: newUserId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

// ✅ Get audit logs
router.get('/get-audit-logs', async (req, res) => {
  try {
    const logs = await db('audit_logs')
      .select('*')
      .orderBy('created_at', 'desc')
      .limit(100);

    res.json({ success: true, logs });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ success: false, message: 'Error fetching audit logs' });
  }
});

// ✅ Admin Logout
router.post('/logout', async (req, res) => {
  await logAudit({
    userId: req.admin.id,
    username: req.admin.email,
    action: 'Admin Logout',
    ipAddress: req.ip || req.connection.remoteAddress
  });
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;