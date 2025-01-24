const express = require('express');
const router = require('express').Router();

const movieController = require('../controllers/movieController.js');

// endpoints
router.get('/', movieController.getAll);

router.get('/:id', movieController.getSingle);

router.post('/', movieController.addMovie);

router.put('/:id', movieController.updateMovie);

router.delete('/:id', movieController.deleteMovie);


module.exports = router;