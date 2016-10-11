//Require express and mongoose
var express = require('./config/express');
var mongoose = require('./config/mongoose');

var db = mongoose();
var app = express();

//Set port
app.set('port', ( process.env.PORT || 9000 ));

app.listen(app.get('port'), function()  {
  console.log('ww is running on: ', app.get('port'));
});

//Export app
module.exports = app;
