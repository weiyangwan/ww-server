var Notification = require('mongoose').model('Notification');
var User = require('mongoose').model('User');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var secret = "hierl&934i/+_jdf34dfhe";

module.exports = {
  index: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    Notification.find()
        .exec(function(err, notifications)  {
          if (err)  {
            return res.status(500).json({
              title: "Error occurred while retrieving notifications",
              error: err
            })
          }
          res.status(200).json({
            message: "Posts retrieved",
            notifications: notifications
          })
        })
  },

  new: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.findById(decodedToken.user._id, function(err, user)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while creating new notification",
          error: err
        })
      }
      var notification = new Notification({
        recipient: req.body.recipient,
        originator: req.body.originator,
        message: req.body.message,
        read: req.body.read,
      })
      notification.save(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while creating new notification",
            error: err
          })
        }
        res.status(200).json({
          message: "Notification created",
          notification: result
        })
      })
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
