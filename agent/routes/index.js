var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({ data: 'index' });
});

router.get('/close', function(req, res, next) {
  res.status(200).json({message: 'closed'});
  process.exit();
});

module.exports = router;
