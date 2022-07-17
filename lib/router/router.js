const express = require('express');
const router = express.Router();

// User
router.use('/api', require('./routes/test'));


module.exports = router;