//Require express and mongoose
var express = require('./config/express');
var mongoose = require('./config/mongoose');

//Require routes
var authRoutes = require('./app/routes/auth.routes'),
    userRoutes = require('./app/routes/user.routes'),
    postRoutes = require('./app/routes/post.routes'),
    itineraryRoutes = require('./app/routes/itinerary.routes'),
    resourceRoutes = require('./app/routes/resource.routes'),
    eventRoutes = require('./app/routes/event.routes'),
    followingRoutes = require('./app/routes/following.routes'),
    notificationRoutes = require('./app/routes/notification.routes');

//Require Passport for authentication
var passport = require('passport');
var session = require('express-session');
// var MongoStore = require('connect-mongo')('session');

var db = mongoose();
var app = express();

//Session config for Passport & MongoDB
var sessionOptions = {
  secret: "do not think just travel",
  resave: true,
  saveUninitialized: true,
  // store: new MongoStore({
  //   mongooseConnection: mongooose.connection
  // })
}
app.use(session(sessionOptions));
app.use(passport.initialize());
//Restore session (restore user's previous session)
app.use(passport.session());

//Initialise passport
var initPassport = require('./config/passport/passportInit');
initPassport(passport);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/itinerary', itineraryRoutes);
app.use('/resource', resourceRoutes);
app.use('/event', eventRoutes);
app.use('/following', followingRoutes);
app.use('/notification', notificationRoutes);


//Set port
app.set('port', ( process.env.PORT || 9000 ));

app.listen(app.get('port'), function()  {
  console.log('ww is running on: ', app.get('port'));
});

//Export app
module.exports = app;
