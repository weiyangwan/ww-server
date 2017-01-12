var Itinerary = require('mongoose').model('Itinerary');
var User = require('mongoose').model('User');

var jwt = require('jsonwebtoken');
var secret = "hierl&934i/+_jdf34dfhe";

module.exports = {
  index: function(req, res, next) {
    Itinerary.findById(req.params.id)
      .exec(function(err, itinerary)  {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while creating itinerary",
            error: err
          })
        }
        if (!itinerary)  {
          return res.status(500).json({
            title: "Itinerary not found",
            error: { message: "Itinerary not found" }
          })
        }
        res.status(200).json({
          message: "Itinerary retrieved",
          itinerary: itinerary
        })
      })
  },

  show: function(req, res, next) {
    Itinerary.findById(req.params.id)
      .select('-events')
      .populate('members', 'username displayPic')
      .exec(function(err, itinerary)  {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while creating itinerary",
            error: err
          })
        }
        if (!itinerary)  {
          return res.status(500).json({
            title: "Itinerary not found",
            error: { message: "Itinerary not found" }
          })
        }
        res.status(200).json({
          message: "Itinerary retrieved",
          itinerary: itinerary
        })
      })
  },

  list: function(req, res, next) {
    Itinerary.findById(req.params.id)
      .populate('activities')
      .exec(function(err, itinerary)  {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while creating itinerary",
            error: err
          })
        }
        if (!itinerary)  {
          return res.status(500).json({
            title: "Itinerary not found",
            error: { message: "Itinerary not found" }
          })
        }

        var itinList = [];
        for (var i = 0; i < itinerary['accommodations'].length; i++) {
          itinList.push(itinerary['accommodations'][i]);
        }
        for (var i = 0; i < itinerary['activities'].length; i++) {
          itinList.push(itinerary['activities'][i]);
        }

        res.status(200).json({
          message: "Itinerary list retrieved",
          itineraryList: itinList
        })
      })
  },

  new: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.findById(decodedToken.user._id, function(err, user)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while creating new itinerary",
          error: err
        })
      }

      var itinerary = new Itinerary({
          name: req.body.name,
          dateFrom: req.body.dateFrom,
          dateTo: req.body.dateTo,
          members: req.body.members,
      })

      itinerary.save(function(err, result) {
        if(err) {
          return res.status(500).json({
            title: "Error occurred while saving new itinerary",
            error: err
          });
        }

        user.itineraries.push(result);
        user.save();
        res.status(201).json({
          message: result.name + " created successfully.",
          itinerary: result
        })
      })
    })
  },

  update: function(req, res, next) {
    Itinerary.findById(req.params.id, function(err, itinerary)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while editing itineary",
          error: err
        })
      }
      if (!itinerary)  {
        return res.status(500).json({
          title: "Itinerary not found",
          error: { message: "Itinerary not found" }
        })
      }

      var newMembers = [];
      for (var i = 0; i < req.body.members.length; i++) {
        for (var j = 0; j < itinerary.members.length; j++) {
          if(req.body.members[i]["_id"] != itinerary.members[j]) {
            newMembers.push(req.body.members[i]);
          }
        }
      }

      for (var i = 0; i < newMembers.length; i++) {
        User.findById(newMembers[i]['_id'], function(err, user) {
          if (err)  {
            return res.status(500).json({
              title: "Error occurred while adding itinerary to new member",
              error: err
            })
          }

          user.itineraries.push(itinerary);
          user.save();
        })
      }

      itinerary.name = req.body.name;
      itinerary.dateFrom = req.body.dateFrom;
      itinerary.dateTo = req.body.dateTo;
      itinerary.members = req.body.members;

      itinerary.save(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while saving edited itinerary",
            error: err
          })
        }
        res.status(200).json({
          message: result.name + " saved successfully.",
          itinerary: result
        })
      })
    })
  },

  destroy: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    Itinerary.findById(req.params.id, function(err, itinerary)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while deleting itinerary",
          error: err
        })
      }
      if (!itinerary)  {
        return res.status(500).json({
          title: "Itinerary not found",
          error: { message: "Itinerary not found" }
        })
      }
      itinerary.remove(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while deleting itinerary",
            error: err
          })
        }
        User.findById(decodedToken.user._id, function(err, user)  {
          if (err)  {
            return res.status(500).json({
              title: "Error occurred while creating new itinerary",
              error: err
            })
          }
          user.itineraries.splice(user.itineraries.indexOf(itinerary), 1);
          user.save();

          res.status(200).json({
            message: result.name + " deleted successfully.",
            obj: result
          })
        })
      })
    })
  }
}
