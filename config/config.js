var env = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV !== 'test') {
  module.exports = require('./env/' + env + '.js');
}
