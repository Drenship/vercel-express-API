const express = require('express');
const router = express.Router();

// User
router.use('/api/user', require('./routes/user'));

// Loication
router.use('/api/user', require('./routes/location'));


// ========== \\
//   Admin    \\
// ========== \\




module.exports = router;