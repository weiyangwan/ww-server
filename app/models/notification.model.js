var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user.model');


var NotificationSchema = new Schema({
  recipient:  { type: Schema.Types.ObjectId, ref: 'User' },
  originator:  { type: Schema.Types.ObjectId, ref: 'User' },
  message:    { type: String },
  read:       Boolean,
  created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Notification', NotificationSchema);
