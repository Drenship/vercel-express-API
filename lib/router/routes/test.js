const express = require('express');
const router = express.Router();

router.get('/test', isAuth, async (req, res) => {
    res.status(201).send({ 
        message: "Hello From Express App" 
    });
});


module.exports = router;