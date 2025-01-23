const mongodb = require("../db/db");
const ObjetId = require("mongodb").ObjectId;

// GET method
const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("movies").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

// GET method (single contact)
const getSingle = async (req, res) => {
  const userId = new ObjetId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("movies")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};


module.exports = {
  getAll,
  getSingle,
};