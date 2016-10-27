var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  posts:[{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

UserSchema.pre('save', function(next) {
  var user = this;
  if(this.isModified('password') || this.isNew) {
    bcrypt.genSalt(5, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash)  {
        if (err)  {
          return next(err);
        }
        user.password = hash;
        next();
      })
    })
  }
  else {
    return next();
  }
})

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch)  {
    if (err)  {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);
