const mongodb = require("../db/db");
const { ObjectId } = require("mongodb");
const { reviewSchema } = require("../schemas/schemas");
const createError = require("http-errors");

// GET method: Get all movies
const getAll = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("reviews")
      .find();
    const movies = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(movies);
  } catch (error) {
    next(
      createError(500, "An error occurred while fetching reviews: " + error)
    );
  }
};

// GET method: Get a single movie by ID
const getSingle = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  try {
    const reviewId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("reviews")
      .findOne({ _id: reviewId });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      next(createError(404, "Review not found"));
    }
  } catch (error) {
    next(
      createError(500, "An error occurred while fetching the review: " + error)
    );
  }
};

// POST method: Add a movie
const addReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  try {
    const validatedReview = await reviewSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("reviews")
      .insertOne(validatedReview);

    if (result.acknowledged) {
      res.status(201).send("Review added successfully");
    } else {
      next(createError(400, "Failed to add review"));
    }
  } catch (error) {
    if (error.isJoi) {
      next(createError(400, "Invalid data format"));
    } else {
      next(
        createError(500, "An error occurred while adding the review: " + error)
      );
    }
  }
};

// PUT method: Update a movie by ID
const updateReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  try {
    const reviewId = new ObjectId(req.params.id);
    const validatedReview = await reviewSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("reviews")
      .updateOne({ _id: reviewId }, { $set: validatedReview });

    if (result.modifiedCount > 0) {
      res.status(200).send("Review updated successfully");
    } else {
      next(createError(404, "Review not found"));
    }
  } catch (error) {
    if (error.isJoi) {
      next(createError(400, "Invalid data format"));
    } else {
      next(
        createError(
          500,
          "An error occurred while updating the review: " + error
        )
      );
    }
  }
};

// DELETE method: Delete a movie by ID
const deleteReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  try {
    const reviewId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("reviews")
      .deleteOne({ _id: reviewId });

    if (result.deletedCount > 0) {
      res.status(200).send("Review deleted successfully");
    } else {
      next(createError(404, "Review not found"));
    }
  } catch (error) {
    next(
      createError(500, "An error occurred while deleting the review: " + error)
    );
  }
};

module.exports = { getAll, getSingle, addReview, updateReview, deleteReview };
