const express = require('express');
const router = express.Router();
const path = require('path');
const { exec } = require('child_process');

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(path.join(__dirname, '..', '..', 'agent'));
	exec(
		'node ./bin/www 3001',
		{
			cwd: path.join(__dirname, '..', '..', 'agent')
		},
		(err, stdout) => {
			if (err) {
				console.log(err);
			}
			console.log(stdout);
		}
	);
	res.send('respond with a resource');
});

module.exports = router;
