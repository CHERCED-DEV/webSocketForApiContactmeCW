const { config } = require('dotenv');
config();

module.exports = {
  uriDb: process.env.MONGODB_INTEGRAL_DB,
  CORS: process.env.VERCEL_URL_CORS
};