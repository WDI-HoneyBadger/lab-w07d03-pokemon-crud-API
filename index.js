// top level config ------------------------------------------------------
// require our packages and dependancies 

var express = require('express');
var mustache = require('mustache-express');
var port = 3000;

// morgan is a logger - similar to what we built in the middleware 
// lesson it will log each request made to our server
var logger = require('morgan');
var bodyParser = require('body-parser');


// app level config ------------------------------------------------------
// create our application and tell it what to do
var app = express();

// mustache set up
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// import our controllers
app.get('/', function(req, res){
  res.render('./index');
})
var pokemonController = require('./controllers/pokemonController');

//route controllers
app.use('/pokemon', pokemonController);

// start the server!
app.listen(port, function () {
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
});

