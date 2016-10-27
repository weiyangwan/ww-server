//Require express and mongoose
var express = require('./config/express');
var mongoose = require('./config/mongoose');

//Require routes
var authRoutes = require('./app/routes/auth.routes');
var userRoutes = require('./app/routes/user.routes');

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

//Set port
app.set('port', ( process.env.PORT || 9000 ));

app.listen(app.get('port'), function()  {
  console.log('ww is running on: ', app.get('port'));
});

//Export app
module.exports = app;
