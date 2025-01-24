const express = require("express");
const router = require("express").Router();

const reviewController = require("../controllers/reviewController.js");

// endpoints
router.get("/", reviewController.getAll);

router.get("/:id", reviewController.getSingle);

router.post('/', reviewController.addReview);

router.put('/:id', reviewController.updateReview);

router.delete('/:id', reviewController.deleteReview);

module.exports = router;
