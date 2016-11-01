var User = require('mongoose').model('User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var secret = "hierl&934i/+_jdf34dfhe";

module.exports = {
  new: function(req, res, next) {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    user.save(function(err, result) {
      if(err) {
        return res.status(500).json({
          title: "Sign Up Error",
          error: err
        });
      }
      var token = jwt.sign({user: result}, secret, { expiresIn: 31536000} )
      res.status(201).json({
        message: "Sign Up Successful",
        token: token,
        username: user.username,
        userId: user._id
      })
    })
  },

  signin: function(req, res, next) {
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
      // if (!bcrypt.compareSync(req.body.password, user.password))  {
      //   return res.status(401).json({
      //     title: "Sign in error",
      //     error: { message: "Please check your email and password again"}
      //   })
      // }
      user.comparePassword(req.body.password, function(err, isMatch)  {
        if(isMatch && !err) {
          var token = jwt.sign({user: user}, secret, { expiresIn: 31536000} )
          res.status(200).json({
            message: "Sign In Successful",
            token: token,
            username: user.username,
            userId: user._id
          })
        } else {
          return res.status(401).json({
            title: "Sign in error",
            error: { message: "Please check your email and password again"}
          })
        }
      })
    });
  },

  show: function(req, res, next)  {
    User.findById(req.params.id)
        .populate('posts')
        .exec(function(err, user)  {
          if (err)  {
            return res.status(500).json({
              title: "An error occurred",
              error: err
            })
          }
          if (!user)  {
            return res.status(500).json({
              title: "User not found",
              error: {message: "User not found"}
            })
          }
          res.status(200).json({
            title: "User found",
            user: {
              username: user.username,
              id: user._id,
              email: user.email,
              created_at: user.created_at,
              posts: user.posts
            }
          })
    })
  }
  //
  // update:
  //
  // destroy:
}
