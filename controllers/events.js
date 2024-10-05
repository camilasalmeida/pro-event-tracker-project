const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);                  
        res.render('events/index.ejs', {                                                 
            events: currentUser.events,
        });
        } catch (error) {
        console.log(error)
        res.send(error);
    }
});

router.get('/new', async (req, res) => {
    res.render('events/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);                      
        currentUser.events.push(req.body);                                                  
        await currentUser.save();                                                          
        res.redirect(`/users/${currentUser._id}/events`);                                   
    } catch (error) {
        console.log(error);
        res.redirect('/')                                                                   
    }
});

router.get('/:eventId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);                      
        const event = currentUser.events.id(req.params.eventId);                            
        res.render('events/show.ejs', {                                                     
            event: event,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.delete('/:eventId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.events.id(req.params.eventId).deleteOne();                             
        await currentUser.save();                                                          
        res.redirect(`/users/${currentUser._id}/events`);                                     
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

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

router.put('/:eventId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const event = currentUser.events.id(req.params.eventId);
        event.set(req.body);
        await currentUser.save();
        res.redirect(
            `/users/${currentUser._id}/events/${req.params.eventId}`
        );
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;                                                                    

