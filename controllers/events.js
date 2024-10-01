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

router.get('/new', async (req, res) => {
    res.render('events/new.ejs');
});

//------POST-------\\

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);                      // Look up the user from req.session.
        currentUser.events.push(req.body);                                                  // Push req.body (the new form data object) to the events array of the current user.
        await currentUser.save();                                                           // Save changes to the user.
        res.redirect(`/users/${currentUser._id}/events`);                                   // Redirect them back to the events index view.
    } catch (error) {
        console.log(error);
        res.redirect('/')                                                                   // If any errors, log them and redirect back home.
    }
});

module.exports = router;                                                                    // Export the router so we can use it in our main server file.

