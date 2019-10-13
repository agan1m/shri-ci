const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
});

module.exports = {
  port: process.env.PORT,
  deployRepo: process.env.DEPLOY_REPO,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};