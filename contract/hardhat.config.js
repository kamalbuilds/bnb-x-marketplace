require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const fs = require('fs');

module.exports = {
  defaultNetwork: "binanceTestnet",
  networks: {
    hardhat: {
      chainId: 1337
    },
    /*
    mumbai: {
      // Infura
      // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
      url: "https://rpc-mumbai.matic.today",
      accounts: [process.env.privateKey]
    },
    */
    binanceTestnet: {
      url: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
      chainId: 97,
      accounts: [process.env.privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
