const express = require('express');
const router = express.Router();
const path = require('path');
const fetch = require('node-fetch');
const execHelper = require('../utils/execCommandUtil');
/* GET users listing. */
const MEDIUM_POST_URL = `http://localhost:3001`;
router.get('/', function(req, res, next) {
	const { host = '', port = '', command, repository } = req.query;
	execHelper(`node ./bin/www ${port} ${host}`, {
		cwd: path.join(process.cwd(), '..', 'agent')
	})
		.then((res) => {
			console.log(res);
			return fetch(
				`${MEDIUM_POST_URL}/build?command=${command}&repository=${repository}`
			);
		})
		.then((res) => {
			res.json({ data: JSON.stringify(res) });
		})
		.catch((err) => console.log(err));
	/* exec(
		`node ./bin/www ${port} ${host}`,
		{
			cwd: path.join(process.cwd(), '..', 'agent')
		},
		(err, stdout) => {
			if (err) {
				console.log(err);
			}
			fetch(
				`${MEDIUM_POST_URL}/build?command=${command}&repository=${repository}`
			).then((res) => {
				res.json({ data: res });
			});
		}
	); */
});

router.get('/close', function(req, res, next) {
	fetch(`${MEDIUM_POST_URL}/close`).then(() => {
		res.json({ data: 'proccess closed' });
	});
});

module.exports = router;
