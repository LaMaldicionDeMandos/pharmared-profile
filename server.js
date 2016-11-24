config = require('./services/config');

var DB = require('./services/database');
db = new DB(config.db_connection);

var users = require('./routers/user');

/* Routers */

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

/* ENDPOINTS */
app.use('/user', users);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


