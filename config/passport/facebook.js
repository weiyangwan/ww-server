var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../app/models/user.model');
var facebookConfig = require('./socialAuthenticationSetting');

module.exports = function(passport) {

  passport.use('facebook', new FacebookStrategy({
    clientID: facebookConfig.facebookID,
    clientSecret: facebookConfig.facebookSecret,
    callbackURL: facebookConfig.facebookCallbackUrl,
    profileFields: ['id', 'displayName', 'email']
  },

  // facebook will send back the tokens and profile
  function(access_token, refresh_token, profile, done)  {
    console.log(profile);

    process.nextTick(function() {

      //find user in the database based on their facebook email
      User.findOne({ 'email': profile.emails }, function(err, user)  {
        console.log("Finding facebook user in server");
        if (err) return done(err);

        //Is the user log in here if user is found????
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();

          newUser.username = profile.name.givenName;
          newUser.email = profile.email;
          // newUser.profilePhoto = profile.picture.data.url //need to confirm this

          newUser.save(function(err)  {
            if (err) throw err;

            return done(null, newUser);
          })//end of save
        }
      })//end of findOne
    })//end of nextTick
  }))//end of passport.use()
}
