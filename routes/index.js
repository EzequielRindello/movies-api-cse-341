const router = require("express").Router();
const passport = require("passport");

// router.get("/", (req, res) => {
//   //#swagger.tags = ['Restful api for movies']
//   res.send("Restful api for movies");
// });

router.use("/", require("./swagger"));

router.use("/movies", require("./movies"));

router.use("/reviews", require("./reviews"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});


module.exports = router;
