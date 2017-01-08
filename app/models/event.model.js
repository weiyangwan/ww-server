var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user.model');


var EventSchema = new Schema({
  categories:  [{
    _id: false,
    value:   { type: String, trim: true },
    icon:    { type: String, trim: true },
    checked: { type: Boolean, trim: true }
  }],
  type:                        { type: String, trim: true },
  country:                     { type: String, trim: true },
  city:                        { type: String, trim: true },
  name:                        { type: String, trim: true },
  photo:                       { type: String, trim: true },
  description:                 { type: String, trim: true },
  subDescription:              { type: String, trim: true },
  opening_hours:               { type: String, trim: true },
  entryFee:                    { type: String, trim: true },
  website:                     { type: String, trim: true },
  formatted_address:           { type: String, trim: true },
  lat:                         { type: Number, trim: true },
  lng:                         { type: Number, trim: true },
  international_phone_number:  { type: String, trim: true },
  date:                        { type: String, trim: true },
  checkInDate:                 { type: String, trim: true },
  checkOutDate:                Date,
  time:                        { type: String, trim: true },
  url:                         { type: String, trim: true },
  place_id:                    { type: String, trim: true },
  note:                        { type: String, trim: true },
  locationCheckedIn:           [{ type: String, trim: true }],
  transportType:               String,
  referenceNumber:             { type: String, trim: true },
  depTerminal:                 { type: String, trim: true },
  arrTerminal:                 { type: String, trim: true },
  depStation:                  { type: String, trim: true },
  arrStation:                  { type: String, trim: true },
  depCity:                     { type: String, trim: true },
  arrCity:                     { type: String, trim: true },
  transportCompany:            { type: String, trim: true },
  contactNumber:               { type: String, trim: true },
  depDate:                     Date,
  depTime:                     String,
  arrDate:                     Date,
  arrTime:                     String,
  itinerary:                   { type: Schema.Types.ObjectId, ref: 'Itinerary' },
  user:                        { type: Schema.Types.ObjectId, ref: 'User' },
  created_at:                  { type: Date, default: Date.now }
})

// ActivitySchema.post('remove', function(ac)  {
//   User.findById(post.user, function(err, user){
//     user.posts.pull(post);
//     user.save();
//   })
// })

module.exports = mongoose.model('EventItem', EventSchema);
