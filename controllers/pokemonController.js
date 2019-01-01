const express = require('express');
const router = express.Router();

const pokemon = require('../models/pokemon');

// add routes and functions here
const sendAllPokemon = (req, res) => res.json(res.locals.allPokemon);
const sendOnePokemon = (req, res) => res.json(res.locals.pokemon);
const sendSuccess = (req, res) => res.send('success');

router.get('/', pokemon.getAll, sendAllPokemon);
router.get('/:id', pokemon.find, sendOnePokemon);
router.post('/', pokemon.create, sendOnePokemon);
router.put('/:id', pokemon.update, sendOnePokemon);
router.delete('/:id', pokemon.delete, sendSuccess)


module.exports = router;