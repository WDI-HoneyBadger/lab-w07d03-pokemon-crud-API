// top level config ------------------------------------------------------
// require our packages and dependancies 

const express = require('express');
const port = 3000;

// morgan is a logger - similar to what we built in the middleware 
// lesson it will log each request made to our server
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


// app level config ------------------------------------------------------
// create our application and tell it what to do
const app = express();


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// import our controllers
app.get('/', (req, res) => {
  res.render('./index');
})
const pokemonController = require('./controllers/pokemonController');

//route controllers
app.use('/pokemon', pokemonController);

// start the server!
app.listen(port, () => {
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
});

