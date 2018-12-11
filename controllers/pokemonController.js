var express = require('express');
var router = express.Router();

var pokemon = require('../models/pokemon');

router.get('/', pokemon.getAll, renderIndex);
router.get('/new', renderNew);
router.get('/:id', pokemon.find, renderShow);
router.post('/', pokemon.create, redirectShow);


function renderIndex(req, res){
  mustacheVariables = {
    pokemon: res.locals.pokemon
  }
  console.log(mustacheVariables)
  res.render('./pokemon/index', mustacheVariables);
}

function renderShow(req,res){
  mustacheVariables = res.locals.pokemon;
  res.render('./pokemon/show', mustacheVariables);
}

function renderNew(req, res){
  res.render('./pokemon/new');
}
function redirectShow(req, res) {
  console.log(req.body);
  res.redirect(`/pokemon/${res.locals.pokemon_id}`);
}

module.exports = router;