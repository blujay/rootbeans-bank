
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://heroku_app23523534:gbf5ecj7gf6eeieglq4lc9l6t@ds035617.mongolab.com:35617/heroku_app23523534');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/userlist', routes.userlist(db));
app.get('/beanbaglist', routes.beanbaglist(db));
app.get('/beanlist', routes.beanlist(db));
app.get('/newuser', routes.newuser);
app.get('/newbeanbag', routes.newbeanbag);
app.get('/newbean', routes.newbean);

app.post('/adduser', routes.adduser(db));
app.post('/addbeanbag', routes.addbeanbag(db));
app.post('/addbean', routes.addbean(db));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
