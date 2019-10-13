const express = require('express');
const router = express.Router();
const path = require('path');
const { exec } = require('child_process');

/* GET users listing. */
router.get('/', function(req, res, next) {
	const { body } = req;
    console.log(body);
	res.json({ data: body });
});

module.exports = router;
