const express = require('express');
const router = express.Router();
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');

const MEDIUM_POST_URL = `http://localhost:3001`;
router.get('/', function(req, res, next) {
	const { host = '', port = '' } = req.query;
	const logPath = path.join(process.cwd(), 'logs', 'agents.log');
	/* register agent */
	if (fs.existsSync(logPath)) {
		fs.readFile(logPath, 'utf8', (err, data) => {
			if (err) {
				return res.status(500).json({ error: err });
			}

			const isExist = data.split('\n').find((it) => it == port);

			if (!isExist) {
				fs.appendFile(logPath, `\n${port}`, (err) => {
					if (err) {
						return res.status(500).json({ error: err });
					}
					res.json({ message: 'agent notify' });
				});
			} else {
				return res.status(500).json({ error: 'Already use' });
			}
		});
	} else {
		fs.writeFile(logPath, port, (err) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			res.json({ message: 'agent notify' });
		});
	}
});

router.get('/close', function(req, res, next) {
	fetch(`${MEDIUM_POST_URL}/close`).then(() => {
		res.json({ data: 'process closed' });
	});
});

module.exports = router;
