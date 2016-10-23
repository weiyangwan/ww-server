var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

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

module.exports = router;
