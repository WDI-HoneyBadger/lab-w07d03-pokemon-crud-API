var db = require('../db/config');

var pokemon = {};

// create a method that gets all the data from the "pokemon" table
pokemon.getAll = function (req, res, next) {
  db.manyOrNone("SELECT * FROM pokemon;")  // query the database
    .then(function (result) {   // return the data as a javascript object "result"
      res.locals.pokemon = result;  // save that javascript object to the response object in res.locals.pokemon
      next();  // move on to the next command
    })
    .catch(function(error){ // if there is an issue when getting all the pokemon
      console.log(error); // log the error
      next(); // move on to the next command
    })
}

pokemon.find = function (req, res, next) {
  var id = req.params.id;
  db.oneOrNone("SELECT * FROM pokemon WHERE id = $1;", [id])
    .then(function(result){
      res.locals.pokemon = result;
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
}

pokemon.create = function(req, res, next){
  db.one(`INSERT INTO pokemon(name, img) VALUES($1, $2) RETURNING id;`,
         [req.body.name, req.body.img])
    .then(function(result){
      res.locals.pokemon_id = result.id;
      next();
    }).catch(function(error){
      console.log(error);
      next();
    })
}

module.exports = pokemon;