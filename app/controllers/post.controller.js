var Post = require('mongoose').model('Post');
var User = require('mongoose').model('User');

var jwt = require('jsonwebtoken');
var secret = "hierl&934i/+_jdf34dfhe";

module.exports = {
  index: function(req, res, next) {
    Post.find()
        .populate('user', 'username')
        .exec(function(err, posts)  {
          if (err)  {
            return res.status(500).json({
              title: "Error occurred while posting new content",
              error: err
            })
          }
          res.status(200).json({
            message: "Posts retrieved",
            posts: posts
          })
        })
  },

  new: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.findById(decodedToken.user._id, function(err, user)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while posting new content",
          error: err
        })
      }
      var post = new Post({
        content: req.body.content,
        user: user //this saves the whole user object
      })
      post.save(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while saving new content",
            error: err
          })
        }
        user.posts.push(result);
        user.save();
        res.status(200).json({
          message: "Post saved",
          post: result
        })
      })
    })
  },

  update: function(req, res, next) {
    Post.findById(req.params.id, function(err, post)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while editing post",
          error: err
        })
      }
      if (!post)  {
        return res.status(500).json({
          title: "Post not found",
          error: { message: "Post not found" }
        })
      }
      post.content = req.body.content;
      post.save(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while saving edited content",
            error: err
          })
        }
        res.status(200).json({
          message: "Edited post saved",
          obj: result
        })
      })
    })
  },

  destroy: function(req, res, next) {
    Post.findById(req.params.id, function(err, post)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while deleting post",
          error: err
        })
      }
      if (!post)  {
        return res.status(500).json({
          title: "Post not found",
          error: { message: "Post not found" }
        })
      }
      post.remove(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while deleting post",
            error: err
          })
        }
        res.status(200).json({
          message: "Post deleted",
          obj: result
        })
      })
    })
  }
}
