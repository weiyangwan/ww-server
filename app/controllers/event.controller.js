var EventItem = require('mongoose').model('EventItem');
var Itinerary = require('mongoose').model('Itinerary');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var secret = "hierl&934i/+_jdf34dfhe";

module.exports = {
  index: function(req, res, next) {
    EventItem.find({"itinerary": mongoose.Types.ObjectId(req.query.itinId)})
            .populate('user', 'username')
            .sort({date: 1})
            .sort({time: 1})
            .exec(function(err, events)  {
              if (err)  {
                return res.status(500).json({
                  title: "Error occurred while getting events",
                  error: err
                })
              }
              res.status(200).json({
                message: "Events retrieved",
                events: events
              })
            })
  },

  new: function(req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.findById(decodedToken.user._id, function(err, user)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while creating creating new item",
          error: err
        })
      }
      var eventItem = new EventItem({
        categories: req.body.categories,
        type: req.body.type,
        country: req.body.country,
        city: req.body.city,
        name: req.body.name,
        photo: req.body.photo,
        description: req.body.description,
        subDescription: req.body.subDescription,
        opening_hours: req.body.opening_hours,
        entryFee: req.body.entryFee,
        website: req.body.website,
        formatted_address: req.body.formatted_address,
        lat: req.body.lat,
        lng: req.body.lng,
        international_phone_number: req.body.international_phone_number,
        date: req.body.date,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        time: req.body.time,
        url: req.body.url,
        place_id: req.body.place_id,
        note: req.body.note,
        locationCheckedIn: req.body.locationCheckedIn,
        transportType: req.body.transportType,
        referenceNumber: req.body.referenceNumber,
        depTerminal: req.body.depTerminal,
        arrTerminal: req.body.arrTerminal,
        depStation: req.body.depStation,
        arrStation: req.body.arrStation,
        depCity: req.body.depCity,
        arrCity: req.body.arrCity,
        transportCompany: req.body.transportCompany,
        contactNumber: req.body.contactNumber,
        depTime: req.body.depTime,
        arrTime: req.body.arrTime,
        depDate: req.body.depDate,
        arrDate: req.body.arrDate,
        itinerary: req.params.id,
        user: req.body.user._Id,
        created_by: req.body.created_by,
      })
      eventItem.save(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while saving new creating new item",
            error: err
          })
        }

        var message;
        if(result['type'] === 'activity') {
          message = 'Activity ' + result['name'] + ' saved'
        }
        if(result['type'] === 'accommodation') {
          message = 'Accommodation ' + result['name'] + ' saved'
        }
        if(result['type'] === 'transport') {
          message = result['transportType'] + ' from ' + result['depCity'] + ' to ' + result['arrCity'] + ' saved'
        }
        result.user.username = req.body.user.username;
        res.status(200).json({
          message: message,
          eventItem: result
        })
      })
    })
  },

  update: function(req, res, next) {
    EventItem.findById(req.params.id, function(err, eventItem)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while editing item",
          error: err
        })
      }
      if (!eventItem)  {
        return res.status(500).json({
          title: "Item not found",
          error: { message: "Item not found" }
        })
      }
      eventItem.categories = req.body.categories,
      eventItem.type = req.body.type,
      eventItem.country = req.body.country,
      eventItem.city = req.body.city,
      eventItem.name = req.body.name,
      eventItem.photo = req.body.photo,
      eventItem.description = req.body.description,
      eventItem.subDescription = req.body.subDescription,
      eventItem.opening_hours = req.body.opening_hours,
      eventItem.entryFee = req.body.entryFee,
      eventItem.website = req.body.website,
      eventItem.formatted_address = req.body.formatted_address,
      eventItem.lat = req.body.lat,
      eventItem.lng = req.body.lng,
      eventItem.international_phone_number = req.body.international_phone_number,
      eventItem.date = req.body.date,
      eventItem.checkInDate = req.body.checkInDate,
      eventItem.checkOutDate = req.body.checkOutDate,
      eventItem.time = req.body.time,
      eventItem.url = req.body.url,
      eventItem.place_id = req.body.place_id,
      eventItem.note = req.body.note,
      eventItem.locationCheckedIn = req.body.locationCheckedIn,
      eventItem.transportType = req.body.transportType,
      eventItem.referenceNumber = req.body.referenceNumber,
      eventItem.depTerminal = req.body.depTerminal,
      eventItem.arrTerminal = req.body.arrTerminal,
      eventItem.depStation = req.body.depStation,
      eventItem.arrStation = req.body.arrStation,
      eventItem.depCity = req.body.depCity,
      eventItem.arrCity = req.body.arrCity,
      eventItem.transportCompany = req.body.transportCompany,
      eventItem.contactNumber = req.body.contactNumber,
      eventItem.depTime = req.body.depTime,
      eventItem.arrTime = req.body.arrTime,
      eventItem.depDate = req.body.depDate,
      eventItem.arrDate = req.body.arrDate,

      eventItem.save(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while saving edited item",
            error: err
          })
        }

        var message;
        if(result['type'] === 'activity') {
          message = 'Edited activity ' + result['name'] + ' saved'
        }
        if(result['type'] === 'accommodation') {
          message = 'Edited accommodation ' + result['name'] + ' saved'
        }
        if(result['type'] === 'transport') {
          message = 'Edited ' + result['transportType'] + ' from ' + result['depCity'] + ' to ' + result['arrCity'] + ' saved'
        }

        res.status(200).json({
          message: message,
          obj: result
        })
      })
    })
  },

  destroy: function(req, res, next) {
    EventItem.findById(req.params.id, function(err, eventItem)  {
      if (err)  {
        return res.status(500).json({
          title: "Error occurred while deleting item",
          error: err
        })
      }
      if (!eventItem)  {
        return res.status(500).json({
          title: "Item not found",
          error: { message: "Item not found" }
        })
      }
      eventItem.remove(function(err, result) {
        if (err)  {
          return res.status(500).json({
            title: "Error occurred while deleting item",
            error: err
          })
        }

        var message;
        if(result['type'] === 'activity') {
          message = 'Activity ' + result['name'] + ' deleted'
        }
        if(result['type'] === 'accommodation') {
          message = 'Accommodation ' + result['name'] + ' deleted'
        }
        if(result['type'] === 'transport') {
          message = result['transportType'] + ' from ' + result['depCity'] + ' to ' + result['arrCity'] + ' deleted'
        }
        res.status(200).json({
          message: message,
          obj: result
        })
      })
    })
  }
}
