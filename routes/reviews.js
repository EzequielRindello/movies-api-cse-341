const express = require("express");
const router = require("express").Router();

const reviewController = require("../controllers/reviewController.js");

const { isAuthenticated } = require("../middleware/autenticate.js");

// endpoints
router.get("/", reviewController.getAll);

router.get("/:id", reviewController.getSingle);

router.post("/", isAuthenticated, reviewController.addReview);

router.put("/:id", isAuthenticated, reviewController.updateReview);

router.delete("/:id", isAuthenticated, reviewController.deleteReview);

module.exports = router;
