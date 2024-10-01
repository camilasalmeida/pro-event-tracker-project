// This function's purpose is to check if a user is signed in and authorized to access certain routes or resources.

const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/auth/sign-in');
};

module.exports = isSignedIn;

