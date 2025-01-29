const express = require("express");
const router = require("express").Router();

const movieController = require("../controllers/movieController.js");
 
const { isAuthenticated } = require("../middleware/autenticate.js");

// endpoints
router.get("/", movieController.getAll);

router.get("/:id", movieController.getSingle);

router.post("/", isAuthenticated, movieController.addMovie);

router.put("/:id", isAuthenticated, movieController.updateMovie);

router.delete("/:id", isAuthenticated, movieController.deleteMovie);

module.exports = router;
