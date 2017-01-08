var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user.model');


var FollowingSchema = new Schema({
  user:      { type: Schema.Types.ObjectId, ref: 'User' },
  following: { type: Schema.Types.ObjectId, ref: 'User' },
  status:    String,
  start:     Date,
  end:       Date
})

// user follows following - following followed by user
module.exports = mongoose.model('Following', FollowingSchema);
