const path = require('path');

// import .env variables
require('dotenv').config({
	allowEmptyValues: true,
	path: path.join(__dirname, '.env')
});


//require('dotenv-safe').config();
module.exports = {
	port: process.env.PORT,
	deployRepo: process.env.DEPLOY_REPO
};
