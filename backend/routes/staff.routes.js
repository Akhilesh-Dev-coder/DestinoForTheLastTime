// routes/staff.routes.js
const db = require('../configs/database');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

// 🔐 Staff Auth Middleware
const authenticateStaff = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Ensure the token belongs to a staff member
    if (decoded.role !== 'staff') {
      return res.status(403).json({ success: false, message: 'Access denied. Staff privileges required.' });
    }
    req.staff = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// ✅ Staff Login (Plain text comparison)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const staff = await db('staff').where({ email }).first();
    if (!staff) {
      return res.status(401).json({ success: false, message: 'Staff member not found' });
    }

    // Plain text comparison (⚠️ only for internal use)
    if (password !== staff.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: staff.id, email: staff.email, role: 'staff' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Staff logged in successfully',
      token,
      user: { // Using 'user' to match your frontend expectation
        id: staff.id,
        username: staff.username,
        email: staff.email,
        role: 'staff'
      },
    });
  } catch (error) {
    console.error('Staff login error:', error);
    res.status(500).json({ success: false, message: 'Server error', err: error.message });
  }
});

// 🔐 Protect all following routes
router.use(authenticateStaff);

// ✅ Get all user-submitted content for review (e.g., trips, reviews)
router.get('/content-queue', async (req, res) => {
  try {
    // Example: Fetch user-submitted trips that need review
    // You would adjust this query based on your actual data model
    const pendingContent = await db('user_submissions')
      .where({ status: 'pending' })
      .select('*');
      
    res.status(200).json({ 
      success: true, 
      content: pendingContent 
    });
  } catch (error) {
    console.error('Error fetching content queue:', error);
    res.status(500).json({ success: false, message: 'Error fetching content', err: error.message });
  }
});

// ✅ Get all user queries/complaints
router.get('/user-queries', async (req, res) => {
  try {
    const queries = await db('user_queries')
      .where({ status: 'unresolved' })
      .select('*');
      
    res.status(200).json({ 
      success: true, 
      queries 
    });
  } catch (error) {
    console.error('Error fetching user queries:', error);
    res.status(500).json({ success: false, message: 'Error fetching queries', err: error.message });
  }
});

// ✅ Resolve a user query
router.put('/resolve-query/:id', async (req, res) => {
  try {
    const { resolution_notes } = req.body;
    const updated = await db('user_queries')
      .where({ id: req.params.id })
      .update({ 
        status: 'resolved',
        resolved_by: req.staff.id,
        resolution_notes,
        resolved_at: new Date()
      });
      
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Query not found' });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Query resolved successfully' 
    });
  } catch (error) {
    console.error('Error resolving query:', error);
    res.status(500).json({ success: false, message: 'Error resolving query', err: error.message });
  }
});

// ✅ Approve/Reject user-submitted content
router.post('/review-content/:id', async (req, res) => {
  try {
    const { action, notes } = req.body; // action: 'approve' or 'reject'
    
    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ success: false, message: 'Invalid action. Use "approve" or "reject".' });
    }

    const updateData = {
      status: action === 'approve' ? 'approved' : 'rejected',
      reviewed_by: req.staff.id,
      review_notes: notes,
      reviewed_at: new Date()
    };

    const updated = await db('user_submissions')
      .where({ id: req.params.id })
      .update(updateData);
      
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
    
    res.status(200).json({ 
      success: true, 
      message: `Content ${action}d successfully` 
    });
  } catch (error) {
    console.error('Error reviewing content:', error);
    res.status(500).json({ success: false, message: 'Error reviewing content', err: error.message });
  }
});

// ✅ Escalate an issue to admin
router.post('/escalate-issue', async (req, res) => {
  try {
    const { issue_title, issue_description, content_id } = req.body;
    
    if (!issue_title || !issue_description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const [newIssueId] = await db('escalated_issues').insert({
      title: issue_title,
      description: issue_description,
      content_id: content_id || null,
      escalated_by: req.staff.id,
      status: 'pending',
      created_at: new Date()
    });

    res.status(201).json({ 
      success: true, 
      message: 'Issue escalated to admin successfully',
      issue_id: newIssueId
    });
  } catch (error) {
    console.error('Error escalating issue:', error);
    res.status(500).json({ success: false, message: 'Error escalating issue', err: error.message });
  }
});

module.exports = router;