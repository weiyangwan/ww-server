var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);
  require('../app/models/event.model');
  require('../app/models/following.model');
  require('../app/models/itinerary.model');
  require('../app/models/post.model');
  require('../app/models/resource.model');
  require('../app/models/user.model');
  require('../app/models/notification.model');
return db;
}
