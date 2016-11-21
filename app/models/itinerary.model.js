var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user.model');

var ItinerarySchema = new Schema({
  name:  {
    type: String,
    required: true,
    trim: true,
  },
  dateFrom: Date,
  dateTo: Date,
  members: [{
    _id: false,
    username: {
      type: String,
      trim: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  accommodations: [{
    _id: false,
    name: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    checkInDate: Date,
    checkOutDate: Date,
    note: {
      type: String,
      trim: true
    }}],
  transports: [{
    _id: false,
    transportType: String,
    referenceNumber: {
      type: String,
      trim: true
    },
    depTerminal: {
      type: String,
      trim: true
    },
    arrTerminal: {
      type: String,
      trim: true
    },
    stationFrom: {
      type: String,
      trim: true
    },
    stationTo: {
      type: String,
      trim: true
    },
    cityFrom: {
      type: String,
      trim: true
    },
    cityTo: {
      type: String,
      trim: true
    },
    depDate: Date,
    depTime: String,
    arrDate: Date,
    arrTime: String,
    rentalCompany: {
      type: String,
      trim: true
    },
    contactNumber: {
      type: String,
      trim: true
    },
    note: {
      type: String,
      trim: true
    },
  }],
  created_at: {
    type : Date,
    default: Date.now
  }
})

ItinerarySchema.post('remove', function(itinerary)  {
  User.findById(itinerary.user, function(err, user){
    user.itineraries.pull(itinerary);
    user.save();
  })
})


module.exports = mongoose.model('Itinerary', ItinerarySchema);
