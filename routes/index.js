const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags = ['Restful api for movies']
  res.send("Restful api for movies");
});

router.use("/movies", require("./movies"));

router.use("/reviews", require("./reviews"));

module.exports = router;
