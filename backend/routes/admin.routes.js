const db = require('../configs/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const admin = await db('admin').where({ email }).first();

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found',
      });
    }

    if (password !== admin.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Admin logged in successfully',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error occurred',
      err: error.message,
    });
  }
});


// ✅ Get all users
router.get('/get-users', async (req, res) => {
  try {
    const users = await db('user_creds').select('user_id', 'username', 'email', 'created_at');
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching users', err: error.message });
  }
});

// ✅ Get single user by ID
router.get('/get-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db('user_creds').where({ user_id: id }).first();

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching user', err: error.message });
  }
});

// ✅ Update/Edit user
router.put('/edit-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const updated = await db('user_creds').where({ user_id: id }).update({ username, email });

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
    const { id } = req.params;

    const deleted = await db('user_creds').where({ user_id: id }).del();

    if (!deleted) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error deleting user', err: error.message });
  }
});// ✅ Create new user
router.post('/create-user', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if email already exists
    const existingUser = await db('user_creds').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Insert new user
    const [newUserId] = await db('user_creds').insert(
      { username, email, password }, // ⚠️ password stored as plain text (not secure!)
      ['user_id'] // returns inserted id (works in PostgreSQL/SQLite >= 3.35)
    );

    res.status(201).json({ 
      success: true, 
      message: 'User created successfully', 
      user_id: newUserId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating user', err: error.message });
  }
});




module.exports = router;