// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const staffRoutes = require('./routes/staff.routes'); // ✅ Ensure this is present

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes); // ✅ This enables /api/staff/login, /api/staff/content, etc.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running On Port : ${PORT}`);
});