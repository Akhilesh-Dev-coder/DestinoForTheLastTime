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


router.get('/get-users', async (req, res) => {
  try {
    const users = await db('user_creds').select('user_id', 'username', 'email'); 

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      err: error.message,
    });
  }
});


module.exports = router;