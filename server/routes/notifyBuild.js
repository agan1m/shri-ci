const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

/* GET users listing. */
router.post('/', function(req, res, next) {
	const { body } = req;
	const logPath = path.join(process.cwd(), 'logs', 'builds.log');

	if (fs.existsSync(logPath)) {
		fs.appendFile(logPath, `\n${JSON.stringify(body)}`, (err) => {
			if (err) throw console.log(err);
		});
		res.json({ status: 'success' });
	} else {
		fs.writeFile(logPath, JSON.stringify(body), (err) => {
			if (err) throw console.log(err);

			res.json({ status: 'success' });
		});
	}
});

module.exports = router;
