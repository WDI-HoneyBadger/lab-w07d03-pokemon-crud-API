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
  var pokeData = {
    name: req.body.name,
    type1: req.body.type1,
    type2: req.body.type2 || "",
    hitpoints: req.body.hitpoints,
    attack: req.body.attack,
    defense: req.body.defense,
    speed: req.body.speed,
    legendary: req.body.legendary === 'true' ? true : false,
    img: req.body.img
  }
  console.log(req.body)
  db.one(
    `INSERT INTO pokemon
    (name, type1, type2, hitpoints, attack, defense, speed, legendary, img) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`,
    [pokeData.name, pokeData.type1, pokeData.type2, pokeData.hitpoints, pokeData.attack,
    pokeData.defense, pokeData.speed, pokeData.legendary, pokeData.img])
    .then(function (result) {
      console.log(result)
      res.locals.pokemon_id = result.id;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    })
}

module.exports = pokemon;