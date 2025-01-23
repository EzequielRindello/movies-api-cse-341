const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Restful api for movies");
});

router.use("/movies", require("./movies"));

module.exports = router;
