
/**
 * Module dependencies.
 */
var dotenv = require('dotenv');
dotenv.load();
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.env.MONGOLAB_URI);

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = path.join(__dirname, 'public');
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
app.get('/about', routes.about);
app.get('/beanbaglist', routes.beanbaglist(db));
app.get('/beanlist', routes.beanlist(db));
app.get('/newbeanbag', routes.newbeanbag);
app.get('/newbean', routes.newbean);

app.post('/addbeanbag', routes.addbeanbag(db));
app.post('/addbean', routes.addbean(db));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
