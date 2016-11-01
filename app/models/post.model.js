var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user.model');


var PostSchema = new Schema({
  content:  {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'User'
  },
  username: {
    type: String,
    trim: true
  },
  created_at: {
    type : Date,
    default: Date.now
  }
})

PostSchema.post('remove', function(post)  {
  User.findById(post.user, function(err, user){
    user.posts.pull(post);
    user.save();
  })
})

module.exports = mongoose.model('Post', PostSchema);
