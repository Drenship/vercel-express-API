const express = require('express');
const router = express.Router();

router.get('/test', async (req, res) => {
    res.status(201).json({ 
        success: true,
        message: "test" 
    });
});


module.exports = router;