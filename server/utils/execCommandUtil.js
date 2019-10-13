const path = require('path');
const { exec } = require('child_process');

function execShellCommand(cmd, options = {}) {
	return new Promise((resolve, reject) => {
		exec(cmd, options, (error, stdout, stderr) => {
			if (error) {
				console.warn(error);
			}
			resolve(stdout ? stdout : stderr);
		});
	});
}

module.exports = execShellCommand;
