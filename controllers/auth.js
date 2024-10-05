const express = require('express');                                                                
const router = express.Router();                                                                   
const User = require('../models/user.js');                                                        
const bcrypt = require('bcrypt');                                                                  

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {                                                      
    
const userInDatabase = await User.findOne({ username: req.body.username });                        
if ( userInDatabase ) {
    return res.send(`Username already taken! Return to <a href="/auth/sign-up">Sign up</a> page!`)
}
if (req.body.password !== req.body.confirmPassword) {                                              
    return res.send(`Password and Confirm Password must match! Return to <a href="/auth/sign-up">Sign up</a> page!`)
}
const hashedPassword = bcrypt.hashSync(req.body.password, 10) ;                                  
req.body.password = hashedPassword;

const user = await User.create(req.body);

req.session.user = {
    username: user.username,
    _id: user._id,
};
  
req.session.save(() => {
    res.redirect("/");
});
});

router.get('/sign-in', async (req, res) => {
    res.render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res) => { 

const userInDatabase = await User.findOne({ username: req.body.username });                         
if ( !userInDatabase ) {
    return res.send(`Login failed. Please try it again! Return to <a href="/auth/sign-in">Sign in</a> page!`);
}

const validPassword = bcrypt.compareSync(                                                           
    req.body.password,
    userInDatabase.password
);
if (!validPassword) {
    return res.send(`Login failed. Please try it again! Return to <a href="/auth/sign-in">Sign in</a> page!`);
}

req.session.user = {                                                                                
    _id: userInDatabase._id
};

req.session.save(() => {
    res.redirect("/");
})});

router.get('/sign-out', async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;                             