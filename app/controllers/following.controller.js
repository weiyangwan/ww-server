var Following = require('mongoose').model('Following');
var User = require('mongoose').model('User');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var secret = "hierl&934i/+_jdf34dfhe";

module.exports = {
  index: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    Following.find({ $or: [ { user: decodedToken.user._id }, { following: decodedToken.user._id } ]})
        .exec(function(err, followings)  {
          if (err)  {
            return res.status(500).json({
              title: "Error occurred while retrieving followings",
              error: err
            })
          }
          res.status(200).json({
            message: "Followings retrieved",
            followings: followings
          })
        })
  },

  new: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    Following.find({ user: req.body.user, following: req.body.following }, function(err, following)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while determining whether following exists",
          error: err
        })
      }

      if(following === []) {
        return res.status(500).json({
          title: "Following already exist",
          error: { message: "Following already exist" }
        })
      }

      if(following !== [])  {
        var following = new Following({
          user: req.body.user,
          following: req.body.following,
          status: req.body.status
        })
        following.save(function(err, result) {
          if (err)  {
            return res.status(500).json({
              title: "Error occurred while saving new following",
              error: err
            })
          }
          res.status(200).json({
            message: "Following saved",
            following: result
          })
        })
      }
    })
  },

  // update: function(req, res, next) {
  //   Post.findById(req.params.id, function(err, post)  {
  //     if (err)  {
  //       return res.status(500).json({
  //         title: "Error occurred while editing post",
  //         error: err
  //       })
  //     }
  //     if (!post)  {
  //       return res.status(500).json({
  //         title: "Post not found",
  //         error: { message: "Post not found" }
  //       })
  //     }
  //     post.content = req.body.content;
  //     post.save(function(err, result) {
  //       if (err)  {
  //         return res.status(500).json({
  //           title: "Error occurred while saving edited content",
  //           error: err
  //         })
  //       }
  //       res.status(200).json({
  //         message: "Edited post saved",
  //         obj: result
  //       })
  //     })
  //   })
  // },
  //
  // destroy: function(req, res, next) {
  //   Post.findById(req.params.id, function(err, post)  {
  //     if (err)  {
  //       return res.status(500).json({
  //         title: "Error occurred while deleting post",
  //         error: err
  //       })
  //     }
  //     if (!post)  {
  //       return res.status(500).json({
  //         title: "Post not found",
  //         error: { message: "Post not found" }
  //       })
  //     }
  //     post.remove(function(err, result) {
  //       if (err)  {
  //         return res.status(500).json({
  //           title: "Error occurred while deleting post",
  //           error: err
  //         })
  //       }
  //       res.status(200).json({
  //         message: "Post deleted",
  //         obj: result
  //       })
  //     })
  //   })
  // }
}
