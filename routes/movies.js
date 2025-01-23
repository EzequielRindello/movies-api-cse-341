const express = require('express');
const router = require('express').Router();

const movieController = require('../controllers/movieController.js');

router.get('/', movieController.getAll);

router.get('/:id', movieController.getSingle);

//add the new endpoints here
//router.post('/', movieController.addMovie();
//router.put('/:id', movieController.updateMovie);
//router.delete('/:id', movieController.deleteMovie);


module.exports = router;