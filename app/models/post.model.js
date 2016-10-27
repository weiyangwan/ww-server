var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  content:  {
    type: String,
    required: true,
    trim, true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

module.exports = mongoose.model('Post', PostSchema);
