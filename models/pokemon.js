const db = require('../db/config');

const pokemon = {};

// create a method that gets all the data from the "pokemon" table
pokemon.getAll = (req, res, next) => {
  db.manyOrNone("SELECT * FROM pokemon;")  // query the database
    .then(result => {   // return the data as a javascript object "result"
      res.locals.allPokemon = result;  // save that javascript object to the response object in res.locals.pokemon
      next();  // move on to the next command
    })
    .catch(error => { // if there is an issue when getting all the pokemon
      console.log(error); // log the error
      next(); // move on to the next command
    })
}

pokemon.find = (req, res, next) => {
  const id = req.params.id;
  db.oneOrNone("SELECT * FROM pokemon WHERE id = $1;", [id])
    .then(result => {
      res.locals.pokemon = result;
      next();
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

pokemon.create = (req, res, next) => {
  const pokeData = {
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
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
    [pokeData.name, pokeData.type1, pokeData.type2, pokeData.hitpoints, pokeData.attack,
    pokeData.defense, pokeData.speed, pokeData.legendary, pokeData.img])
    .then(result => {
      console.log(result)
      res.locals.pokemon= result;
      next();
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

pokemon.update = (req, res, next) => {
  const pokeData = {
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

  db.one(`UPDATE pokemon SET name = $1, type1 = $2, type2 = $3, hitpoints = $4,
  attack = $5, defense = $6, speed = $7, legendary = $8, img = $9 WHERE id = $10 RETURNING *;`, [pokeData.name, pokeData.type1, pokeData.type2, pokeData.hitpoints, pokeData.attack,
    pokeData.defense, pokeData.speed, pokeData.legendary, pokeData.img, req.params.id])
    .then(result => {
      res.locals.pokemon = result;
      next();
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

pokemon.delete = (req, res, next) => {
  db.none('DELETE FROM pokemon WHERE id=$1;', [req.params.id])
    .then(() => {
      console.log('successful delete');
      next();
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

module.exports = pokemon;