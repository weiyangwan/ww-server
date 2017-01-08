var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user.model');

var ItinerarySchema = new Schema({
  name:  { type: String, trim: true, required: true },
  dateFrom: Date,
  dateTo: Date,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'EventItem' }],
  created_at:  { type: Date, default: Date.now }
})

// ItinerarySchema.post('remove', function(itinerary)  {
//   User.findById(itinerary.user, function(err, user){
//     user.itineraries.pull(itinerary);
//     user.save();
//   })
// })


module.exports = mongoose.model('Itinerary', ItinerarySchema);
