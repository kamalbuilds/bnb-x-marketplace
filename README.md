# Bnb-x-marketplace

 A decentralized cross-chain trading bot 
 
 that leverages the data retrieved from PancakeSwap, Uniswap via  NodeReal and 1inch to provide users with a seamless trading experience. The bot could be programmed to execute trades.

# Features

1. https://docs.nodereal.io/reference/uniswap-graphql-api - Using NodeReal to fetch the Swapping data from uniswap nd pancakeswap dex.

2. Polyhedra - zkbridging the nfts

3. Particle Auth + RainbowKit 

Particle Network - utilising the NFT service

4. Manta network- For getting the ingame assets and onchain Txns without disclosing the address.

5. Dex Integrations 1inch
![image](https://user-images.githubusercontent.com/95926324/235235682-1bc0b663-153a-4480-b95f-d74a4b992c67.png)

##  Advantages of Integrating a decentralized exchange (DEX) into a marketplace can be useful in several ways:

Increased liquidity: By integrating a DEX, you can increase liquidity for your marketplace. A DEX allows users to trade cryptocurrencies without the need for a centralized exchange, which means that your marketplace can offer a broader range of cryptocurrencies without having to hold them all in-house.

Trustless transactions: DEXs allow users to trade cryptocurrencies without the need for a middleman or intermediary. This trustless nature of transactions means that users can trade directly with each other without having to trust a centralized exchange.

Enhanced security: DEXs are typically more secure than centralized exchanges since they do not hold users' private keys. Instead, transactions are conducted through smart contracts on a blockchain, which means that users have full control over their assets.

Lower fees: DEXs typically charge lower fees than centralized exchanges since they do not need to maintain a centralized infrastructure or employ a large team of customer service representatives.

Increased decentralization: Integrating a DEX into a marketplace can help promote decentralization, which is a key principle of blockchain technology. By decentralizing the exchange of assets, users can have greater control over their assets and the overall ecosystem.

Overall, integrating a DEX into a marketplace can provide several benefits, including increased liquidity, enhanced security, and lower fees, which can help attract more users to your platform and increase overall trading volumes.

#### Local setup

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory, and install the dependencies:

```sh
git clone https://github.com/dabit3/polygon-ethereum-nextjs-marketplace.git

cd polygon-ethereum-nextjs-marketplace

# install using NPM or Yarn
npm install

# or

yarn
```

2. Start the local Hardhat node

```sh
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the app

```
npm run dev
```
