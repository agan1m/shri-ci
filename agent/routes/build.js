const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
/* GET users listing. */
router.get('/', function(req, res, next) {
	const { id, hash, repository, command } = req.query;
	const cachePath = path.join(process.cwd(), 'logs', 'cache.log');
	const timeStart = new Date();
	const cacheExist = fs.existsSync(cachePath);
	let data = {};
	if (cacheExist) {
		data = fs
			.readFileSync(cachePath, { encoding: 'utf8' })
			.split('\n')
			.map((it) => JSON.parse(it));
		fetchCache(data);
	}
	exec(
		`${command}`,
		{
			cwd: repository
		},
		(err, stdout, stderr) => {
			if (err) {
				const errBody = {
					id,
					agent: process.argv[2],
					command,
					timeStart,
					timeEnd: new Date(),
					stdout,
					stderr,
					status: 'error'
				};

				return fetch('http://localhost:3000/notify_build_result', {
					headers: { 'Content-Type': 'application/json' },
					method: 'POST',
					body: JSON.stringify({ ...errBody })
				})
					.then(() => {
						res.status(200).json({ data: stdout });
					})
					.catch((err) => {
						console.log('я в catch');
						writeCache(cachePath, errBody);
						res.status(500).json({ error: err });
					});
			}

			const successBody = {
				id,
				agent: process.argv[2],
				command,
				timeStart,
				timeEnd: new Date(),
				stdout,
				stderr,
				status: 'success'
			};

			fetch('http://localhost:3000/notify_build_result', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify({ ...successBody })
			})
				.then(() => {
					res.status(200).json({ data: stdout });
				})
				.catch((err) => {
					console.log('я в catch2');
					writeCache(cachePath, JSON.stringify(successBody));
					res.status(500).json({ error: err });
				});
		}
	);
});

function writeCache(path, data) {
	if (fs.existsSync(path)) {
		fs.appendFile(path, `\n${data}`, (err) => {
			console.log('я тут');
			throw err;
		});
	} else {
		fs.writeFile(path, data, (err) => {
			throw err;
		});
	}
}

function fetchCache(cacheArr, count = 0) {
	fetch('http://localhost:3000/notify_build_result', {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({ ...cacheArr[count] })
	})
		.then(() => {
			cacheArr.splice(0, 1);
			if (cacheArr.length === 0) {
				fs.unlinkSync(path.join(process.cwd(), 'logs', 'cache.log'));
				return;
			}
			fetchCache(cacheArr);
		})
		.catch((err) => {
			throw err;
		});
}

module.exports = router;
