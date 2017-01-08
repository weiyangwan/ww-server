var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user.model');


var PostSchema = new Schema({
  content:  { type: String, trim: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, trim: true },
  created_at: { type: Date, default: Date.now }
})

PostSchema.post('remove', function(post)  {
  User.findById(post.user, function(err, user){
    user.posts.pull(post);
    user.save();
  })
})

module.exports = mongoose.model('Post', PostSchema);
