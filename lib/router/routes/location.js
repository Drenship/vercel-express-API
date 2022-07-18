const express = require('express');
const router = express.Router();
const Locations = require('../../models/Locations');

router.get('/', async (req, res) => {
    res.status(201).json({ 
        success: true,
        message: "location" 
    });
});


module.exports = router;