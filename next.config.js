require('dotenv').config();
const withTM = require('next-transpile-modules')(['my-untranspiled-module']);

module.exports = withTM({
  env: {
    INFURA_IPFS_ID: process.env.INFURA_IPFS_ID,
  },
});