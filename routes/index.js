const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Restful api for movies');
});


module.exports = router;