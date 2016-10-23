var express = require('express');
var router = express.Router();
var passport = require('passport');

//GET /auth/login/facebook
router.get('login/facebook',
  passport.authenticate('facebook', {scope: "email" })
);

//GET /auth/facebook/callback
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/'
  })
);

//GET /auth/logout
router.get('logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
