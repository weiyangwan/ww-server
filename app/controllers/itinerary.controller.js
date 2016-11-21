var Itinerary = require('mongoose').model('Itinerary');
var User = require('mongoose').model('User');

var jwt = require('jsonwebtoken');
var secret = "hierl&934i/+_jdf34dfhe";

module.exports = {
  index: function(req, res, next) {
    Itinerary.findById(req.params.id, function(err, itinerary)  {
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
          accommodations: req.body.accommodations,
          transports: req.body.transports
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
          message: "Itinerary creation Successful",
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
      itinerary.name = req.body.name;
      itinerary.dateFrom = req.body.dateFrom;
      itinerary.dateTo = req.body.dateTo;
      itinerary.members = req.body.members;
      itinerary.accommodations = req.body.accommodations;
      itinerary.transports = req.body.transports;

      itinerary.save(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while saving edited itinerary",
            error: err
          })
        }
        res.status(200).json({
          message: "Edited itinerary saved",
          obj: result
        })
      })
    })
  },

}
