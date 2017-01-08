var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    User = require('./user.model');

var ResourceSchema = new Schema({
  link:        { type: String, trim: true },
  description: { type: String, trim: true },
  created_at:  { type: Date, default: Date.now },
  itinerary:   { type: Schema.Types.ObjectId, ref: 'Itinerary' },
  user:        { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Resource', ResourceSchema)
