var User = require('mongoose').model('User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var secret = "hierl&934i/+_jdf34dfhe";

module.exports = {
  index: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.find({}, { username: 1, displayPic: 1 })
      .exec(function(err, users)  {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while getting all users",
            error: err
          })
        }
        if (!users)  {
          return res.status(500).json({
            title: "There are no user",
            error: { message: "There are no user" }
          })
        }

        if(users) {
          for (var i = 0; i < users.length; i++) {
            if(users[i]['_id'] == decodedToken.user._id) {
              users.splice(users.indexOf(users[i]), 1);
            }
          }
          res.status(200).json({
            message: "Users retrieved",
            users: users
          })
        }
      })
  },

  new: function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if(err) {
        return res.status(500).json({
          title: "Sign Up Error",
          error: err
        });
      }

      if (user) {
        return res.status(500).json({
          title: "Email already taken up",
          error: { message: "Email already taken up, please sign in or user another email."}
        });
      }

      if(!user) {
        var user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            displayPic: req.body.displayPic
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
      }
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

  socialSignin: function(req, res, next)  {
    User.findOne({'email': req.body.email}, function(err, user) {
      if (user) {
        // to update username and displayPic if changed
        user.username = req.body.username;
        user.displayPic = req.body.displayPic;

        user.save(function(err, result) {
          if(err) {
            return res.status(500).json({
              title: "Error when updating username and display picture during social log in",
              error: err
            });
          }

          var loginToken = jwt.sign({user: user}, secret, { expiresIn: 31536000} )
          res.status(200).json({
            message: "Social sign in successful",
            token: loginToken,
            username: user.username,
            userId: user._id
          })
        })
      }

      if(!user) {
        var user = new User({
            username: req.body.username,
            email: req.body.email,
            displayPic: req.body.displayPic
        })

        user.save(function(err, result) {
          if(err) {
            return res.status(500).json({
              title: "New social sign up error",
              error: err
            });
          }
          var signupToken = jwt.sign({user: result}, secret, { expiresIn: 31536000} )
          res.status(201).json({
            message: "New social sign up successful",
            token: signupToken,
            username: result.username,
            userId: result._id
          })
        })
      }
    })
  },

  show: function(req, res, next)  {
    var decodedToken = jwt.decode(req.query.token);
    User.findById(decodedToken.user._id)
        .populate('posts')
        .populate('itineraries', 'name dateFrom dateTo')
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
              displayPic: user.displayPic,
              created_at: user.created_at,
              posts: user.posts,
              itineraries: user.itineraries
            }
          })
    })
  },
  //
  // update:
  //

  //need to find post of Users to delete as well
  destroy: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.findById(decodedToken.user._id, function(err, user)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while deleting post",
          error: err
        })
      }
      if (!user)  {
        return res.status(500).json({
          title: "User not found",
          error: { message: "User not found" }
        })
      }
      user.remove(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while deleting user",
            error: err
          })
        }
        res.status(200).json({
          message: "User deleted",
          obj: result
        })
      })
    })
  },

}


// userItinerariesList: function(req, res, next) {
//   var decodedToken = jwt.decode(req.query.token);
//   User.findById(decodedToken.user._id)
//     .populate('itineraries', 'name dateFrom dateTo')
//     .exec(function(err, user)  {
//       if (err)  {
//         return res.status(500).json({
//           title: "An error occurred",
//           error: err
//         })
//       }
//       if (!user)  {
//         return res.status(500).json({
//           title: "User not found",
//           error: { message: "User not found" }
//         })
//       }
//       res.status(200).json({
//         title: "User found",
//         user: {
//           username: user.username,
//           id: user._id,
//           itineraries: user.itineraries
//         }
//       })
//   })
// },
