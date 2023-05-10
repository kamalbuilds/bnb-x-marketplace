require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

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
    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [process.env.privateKey]
    }
    */
    binanceTestnet: {
      url: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
      chainId: 97,
      accounts: ['1156880db2768fe49431d238890240799814e3f27a007aab81c19c69b369fb81']
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
