
const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require('morgan');
const session = require('express-session');                                      // This middleware will automatically manage session data for each user request.
const MongoStore = require("connect-mongo");
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const eventsController = require('./controllers/events.js');                      // -> Import the events controller into the server.js.

const app = express();


//--------------------------------------------------------------------\\

const port = process.env.PORT ? process.env.PORT : "3000";
const path = require('path');                                                     // Requiring `path`, which we use in the express.static middleware.
mongoose.connect(process.env.MONGODB_URI);

const authController = require('./controllers/auth.js');                         // -> We'll instruct our Express app to use the `authController` for handling requests that match the /auth URL pattern.

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//-------------------------- Middleware --------------------------------\\

//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.urlencoded({ extended: false }));                               // Middleware to parse URL-encoded data from forms.
app.use(methodOverride("_method"));                                             // Middleware for using HTTP verbs such as PUT or DELETE.
app.use(morgan('dev'));                                                         // Morgan for logging HTTP requests.
app.use(express.static(path.join(__dirname, 'public')));                         // express.static middleware is designed to serve static files like CSS stylesheets.

app.use(                                                                       // Creating a session, configuring it. Session cookie 🍪
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,                                               // This allows us to create an empty session object.
        store: MongoStore.create({
         mongoUrl: process.env.MONGODB_URI,
        }),
    })
);
app.use(passUserToView);                                                      // Should be included before all our routes.

//----------------------------------------------------------------------\\

app.get('/', async (req, res) => {
    console.log(req.session);
    if (req.session.user) {                                            // Check if the user is signed in.
        console.log('I made it here!')
        res.redirect(`/users/${req.session.user._id}/events`);         // Redirect signed-in users to their events index.
    } else {
    res.render('index.ejs');                                           // Show the homepage for users who are not signed in.
    };
});

//----------------\\
app.use('/auth', authController);                                     // -> That code will funnel any requests starting with /auth to the `authController`.
app.use(isSignedIn);
app.use('/users/:userId/events', eventsController);                   // -> Link the controller. This tells the server that any incoming requests to /users/:userId/events will be handled by our events controller.

//-----------------------------------------------------------------------\\
app.listen(port, () => {
    console.log(`The express app is ready on port ${port} 🎧`);
});
