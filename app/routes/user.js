var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var secret = "hierl&934i/+_jdf34dfhe";

var User = require('../models/user.model')

//user sign up
router.post('/', function(req, res, next) {
  console.log("received signup request in server")
  console.log(req.body);
  var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 9),
  })

  user.save(function(err, result) {
    if(err) {
      return res.status(500).json({
        title: "Sign Up Error",
        error: err
      });
    }
    res.status(201).json({
      message: "Sign Up Successful",
      obj: result
    })

  })
});

router.post('/signin', function(req, res, next) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err) {
      return res.status(500).json({
        title: "Sign Up Error",
        error: err
      });
    }
    if (!user)  {
      return res.status(401).json({
        title: "Sign in error",
        error: { message: "Please check your email and password again"}
      })
    }
    if (!bcrypt.compareSync(req.body.password, user.password))  {
      return res.status(401).json({
        title: "Sign in error",
        error: { message: "Please check your email and password again"}
      })
    }
    var token = jwt.sign({user: user}, secret, { expiresIn: 31536000} )
    res.status(200).json({
      message: "Sign In Successful",
      token: token,
      userId: user._id
    })
  });
})

module.exports = router;
