const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
//---------------------------------------------------------------\\

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);                   // Look up the user from req.session.
        res.render('events/index.ejs', {                                                 // Render index.ejs, passing in all of the current user's events as data in the context objects.
            events: currentUser.events,
        });
        } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

//-------New event page/form ------\\
router.get('/new', async (req, res) => {
    res.render('events/new.ejs');
});

//----------POST the form-----------\\
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

//-----Show page for each event------\\
router.get('/:eventId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);                      // Look up the user from req.session.
        const event = currentUser.events.id(req.params.eventId);                            // Find the event by the eventId supplied from req.params.
        res.render('events/show.ejs', {                                                     // Render the show view, passing the application data in the context object.
            event: event,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

//--------Delete event--------\\
router.delete('/:eventId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.events.id(req.params.eventId).deleteOne();                             // Use the Mongoose .deleteOne() method to delete an event using the id supplied from req.params.
        await currentUser.save();                                                          // Save the changes to the user.
        await redirect(`/users/${currentUser._id}/events`);                                // Redirect them back to the events index view page.
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//----------Edit route-----------\\
router.get('/:eventId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const event = currentUser.events.id(req.params.eventId);
        res.render('events/edit.ejs', {
            event: event,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//----------------------------------\\
module.exports = router;                                                                    // Export the router so we can use it in our main server file.

