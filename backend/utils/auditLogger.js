// utils/auditLogger.js
const db = require('../configs/database');

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

module.exports = logAudit;