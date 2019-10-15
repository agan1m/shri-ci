const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const { deployRepo } = require('../vars');
/* GET home page. */
router.get('/', function(req, res, next) {
	const logPath = path.join(process.cwd(), 'logs', 'builds.log');

	if (fs.existsSync(logPath)) {
		fs.readFile(logPath, 'utf8', (err, data) => {
			if (err) {
				return res.status(500).json({ error: err });
			}

			const portsArr = data
				? data
						.split('\n')
						.map((it) => {
							if (it) {
								return JSON.parse(it);
							}
						})
						.filter((el) => el)
				: [];

			res.render('index', { title: 'Express', builds: portsArr });
		});
	} else {
		res.render('index', { title: 'Express', builds: [] });
	}
});

router.get('/build/:id', function(req, res, next) {
	const { id } = req.params;

	const logPath = path.join(process.cwd(), 'logs', 'builds.log');

	if (fs.existsSync(logPath)) {
		fs.readFile(logPath, 'utf8', (err, data) => {
			if (err) {
				return res.status(500).json({ error: err });
			}

			const portsArr = data
				? data
						.split('\n')
						.map((it) => {
							if (it) {
								return JSON.parse(it);
							}
						})
						.filter((el) => el)
				: [];
			const currentElem = portsArr.find((el) => el.id === id);

			if (currentElem) {
				res.render('build', {
					title: `Build ${currentElem.id}`,
					build: currentElem
				});
			} else {
				res.render('error', { message: 'Not found' });
			}
		});
	} else {
		res.render('error', { message: 'Not found' });
	}
});

router.get('/deploy', function(req, res, next) {
	const logPath = path.join(process.cwd(), 'logs', 'agents.log');

	if (fs.existsSync(logPath)) {
		fs.readFile(logPath, 'utf8', (err, data) => {
			if (err) {
				return res.status(500).json({ error: err });
			}

			const portsArr = data.split('\n');

			const uuid = uuidv4();

			fetchAgent(portsArr, req, res, uuid);
		});
	} else {
		res.json({ error: 'No free agents' });
	}

	//res.render('index', { title: id });
});

function fetchAgent(portArr, req, res, id, agentNum = 0) {
	const { command } = req.query;

	fetch(
		`http://localhost:${portArr[agentNum]}/build?id=${id}&repository=${deployRepo}&command=${command}`
	)
		.then(() => {
			return res.json({ status: 'build running' });
		})
		.catch((err) => {
			agentNum += 1;
			if (portArr[agentNum]) {
				fetchAgent(portArr, req, res, id, agentNum);
			} else {
				return res.json({ error: 'No free agents' });
			}
		});
}

module.exports = router;
