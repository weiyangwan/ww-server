var Resource = require('mongoose').model('Resource');
var User = require('mongoose').model('User');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var secret = "hierl&934i/+_jdf34dfhe";

module.exports = {
  index: function(req, res, next) {
    Resource.find({"itinerary": mongoose.Types.ObjectId(req.query.itinId)})
            .populate('user', 'username')
            .exec(function(err, resources)  {
              if (err)  {
                return res.status(500).json({
                  title: "Error occurred while getting resources",
                  error: err
                })
              }
              res.status(200).json({
                message: "Resources retrieved",
                resources: resources
              })
            })
  },

  new: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.findById(decodedToken.user._id, function(err, user)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while saving new resource",
          error: err
        })
      }
      var resource = new Resource({
        link: req.body.link,
        description: req.body.description,
        itinerary: req.body.itineraryId,
        user: req.body.user._Id
      })
      resource.save(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while saving new resource",
            error: err
          })
        }
        res.status(200).json({
          message: result.description + " created successfully.",
          resource: result
        })
      })
    })
  },

  update: function(req, res, next) {
    Resource.findById(req.params.id, function(err, resource)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while editing resource",
          error: err
        })
      }
      if (!resource)  {
        return res.status(500).json({
          title: "Resource not found",
          error: { message: "Resource not found" }
        })
      }
      resource.link = req.body.link;
      resource.description = req.body.description;

      resource.save(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while saving edited resource",
            error: err
          })
        }
        res.status(200).json({
          message: "Edited " + result.description + " saved successfully.",
          obj: result
        })
      })
    })
  },

  destroy: function(req, res, next) {
    Resource.findById(req.params.id, function(err, resource)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while deleting resource",
          error: err
        })
      }
      if (!resource)  {
        return res.status(500).json({
          title: "Resource not found",
          error: { message: "Resource not found" }
        })
      }
      resource.remove(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while deleting resource",
            error: err
          })
        }
        res.status(200).json({
          message: result.description + " deleted successfully.",
          obj: result
        })
      })
    })
  }
}
