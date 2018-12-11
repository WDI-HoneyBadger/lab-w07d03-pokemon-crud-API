var express = require('express');
var router = express.Router();

var pokemon = require('../models/pokemon');

router.get('/', pokemon.getAll, renderIndex);
router.get('/new', renderNew);
router.get('/:id/edit', pokemon.find, renderEdit);
/* ^^ the edit page edits all the information for a single pokemon.
  In order to edit that information we have to get all the data for a single pokemon.
  We're already getting all the data for a single pokemon in the show route using pokemon.find,
  so we use pokemon.find in our GET edit route.
*/

router.get('/:id', pokemon.find, renderShow);

router.post('/', pokemon.create, redirectShow);
router.delete('/:id', pokemon.delete, redirectIndex);
router.put('/:id', pokemon.update, redirectShow);

function renderIndex(req, res){
  var mustacheVariables = {
    pokemon: res.locals.pokemon
  }
  res.render('./pokemon/index', mustacheVariables);
}

function renderShow(req,res){
  var mustacheVariables = res.locals.pokemon;
  res.render('./pokemon/show', mustacheVariables);
}

function renderEdit(req,res){
  var mustacheVariables = res.locals.pokemon;
  if (mustacheVariables.legendary === true) {
    mustacheVariables.legendary = 'checked';
  } else {
    mustacheVariables.legendary = '';
  }
  res.render('./pokemon/edit', mustacheVariables);
}

function renderNew(req, res){
  res.render('./pokemon/new');
}

function redirectShow(req, res) {
  console.log(req.body);
  res.redirect(`/pokemon/${res.locals.pokemon_id}`);
}

function redirectIndex(req, res){
  res.redirect('/pokemon');
}

module.exports = router;