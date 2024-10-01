const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
//---------------------------------------------------------------\\

router.get('/', (req, res) => {
    try {
        res.render('events/index.ejs');
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});










module.exports = router;                                               // Export the router so we can use it in our main server file.

