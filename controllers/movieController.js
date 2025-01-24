const mongodb = require("../db/db");
const { ObjectId } = require("mongodb");
const { movieSchema } = require("../schemas/schemas");

// GET method: Get all movies
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection("movies").find();
    const movies = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).send("An error occurred while fetching movies: " + error);
  }
};

// GET method: Get a single movie by ID
const getSingle = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .findOne({ _id: movieId });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).send("Movie not found");
    }
  } catch (error) {
    res
      .status(500)
      .send("An error occurred while fetching the movie: " + error);
  }
};

// POST method : Add a movie
const addMovie = async (req, res) => {
  try {
    const validatedMovie = await movieSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .insertOne(validatedMovie);
    if (result.acknowledged) {
      res.status(201).send("Movie added successfully");
    } else {
      res.status(400).send("Failed to add movie");
    }
  } catch (error) {
    res.status(500).send("An error occurred while adding the movie: " + error);
  }
};

// PUT method: Update a movie by ID
const updateMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const validatedMovie = await movieSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .updateOne({ _id: movieId }, { $set: validatedMovie });
    if (result.matchedCount === 0) {
      return res.status(404).send("Movie not found");
    }

    if (result.modifiedCount > 0) {
      res.status(200).send("Movie updated successfully");
    } else {
      res.status(400).send("No changes were made");
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    res
      .status(500)
      .send("An error occurred while updating the movie: " + error);
  }
};

// DELETE method: Delete a movie by ID
const deleteMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("movies")
      .deleteOne({ _id: movieId });
    if (result.deletedCount === 0) {
      return res.status(404).send("Movie not found");
    }

    res.status(200).send("Movie deleted successfully");
  } catch (error) {
    console.error("Error deleting movie:", error);
    res
      .status(500)
      .send("An error occurred while deleting the movie: " + error);
  }
};

module.exports = {
  getAll,
  getSingle,
  addMovie,
  updateMovie,
  deleteMovie,
};
