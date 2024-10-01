// This middleware provides us a shortcut to always pass the information of the logged in user to our requests final destination.

const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null 
    next()
};


/*
const passUserToView = (req, res, nex) => {
if (req.session.user) {
    res.locals.user = res.session.user;
} else {
    res.locals.user = null;
}
nex();
};
*/


module.exports = passUserToView

