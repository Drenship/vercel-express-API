const express = require('express');
const router = express.Router();

router.get('/test', isAuth, async (req, res) => {
    res.status(201).send({ 
        success: true,
        message: "test" 
    });
});


module.exports = router;