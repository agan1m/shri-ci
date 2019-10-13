const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fetch = require('node-fetch');
/* GET users listing. */
router.get('/', function(req, res, next) {
	const { id, hash, repository, command } = req.query;
	exec(
		`${command}`,
		{
			cwd: repository
		},
		(err, stdout) => {
			if (err) {
				res.status(200).json({ error: err });
			}
			fetch('http://localhost:3000/notify_build_result', {
				method: 'POST',
				body: JSON.stringify(stdout)
			}).then(() => {
				res.status(200).json({ data: {} });
			});
		}
	);
});

module.exports = router;
