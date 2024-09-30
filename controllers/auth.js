const express = require('express');                                                                // Import express.
const router = express.Router();                                                                   // Creating a new router instance from the Express Framework. Creating a new router object, which you can use to define specific routes for your application.
const User = require('../models/user.js');                                                         // Since we want this route to create a new User in the database, we need first to import the User model into this file.
const bcrypt = require('bcrypt');                                                                  // -> Hashing library.

//------------------------------------------------------------------------------\\

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

//------------- POST SIGN UP ----------\\
//POST - create the controller function to handle the request.
router.post('/sign-up', async (req, res) => {                                                      // Using async because this function will eventually require a database call.
    //res.send('Form submission accepted!');

const userInDatabase = await User.findOne({ username: req.body.username });                        // Check the database for any existing user with that username.
if ( userInDatabase ) {
    return res.send(`Username already taken! Return to <a href="/auth/sign-up">Sign up</a> page!`)
}
if (req.body.password !== req.body.confirmPassword) {                                              // Check if password and confirmPassaword match.
    return res.send(`Password and Confirm Password must match! Return to <a href="/auth/sign-up">Sign up</a> page!`)
}
const hashedPassword = bcrypt.hashSync(req.body.password, 10) ;                                   // -> Hashing the password.
req.body.password = hashedPassword;

const user = await User.create(req.body);
res.send(`Thanks for signing up ${user.username}!`);
});

//-----------------------//
router.get('/sign-in', async (req, res) => {
    res.render('auth/sign-in.ejs');
});

//------------ POST SIGN IN --------------//
router.post('/sign-in', async (req, res) => {
    //res.send('Request to sign in received!');

const userInDatabase = await User.findOne({ username: req.body.username });                         // Confirming if a User exists.
if ( !userInDatabase ) {
    return res.send(`**Login failed. Please try it again! Return to <a href="/auth/sign-in">Sign in</a> page!`);
}

const validPassword = bcrypt.compareSync(                                                           // Comparing password with the database.
    req.body.password,
    userInDatabase.password
);
if (!validPassword) {
    return res.send(`Login failed. Please try it again! Return to <a href="/auth/sign-in">Sign in</a> page!`);
}

req.session.user = {                                                                                // This code sets the user retrieved from the database as the user in the newly created session.
    username: userInDatabase.username,
    _id: userInDatabase._id
};
res.redirect('/');
});

//------------------------------------------------------------------------------\\
module.exports = router;                              // Export router.