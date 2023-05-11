# Bnb-marketplace

 A ZK NFT Marketplace , where the NFTs are utilised  to tokenize Real World assets like Real Estate.
 
which leverages the data retrieved from PancakeSwap, Uniswap via  NodeReal and 1inch to provide users with a seamless trading experience.

Creation of NFT - https://mumbai.polygonscan.com/tx/0x92893bd0e933da8597a64350282e3702a9c209adba2667d214da7cfcfb67e1f4

# Technologies Used

1. https://docs.nodereal.io/reference/uniswap-graphql-api - Using NodeReal to fetch the Swapping data from uniswap nd pancakeswap dex.

2. Polyhedra - zkbridging the nfts

Multi-chain NFT and GameFi

zkBridge empowers our platform to interact with diverse blockchain networks, unleashing unparalleled opportunities for virtual asset creation, ownership,  fostering a thriving and interoperable digital landscape.

3. Particle Auth + RainbowKit 

Particle Network SDK - utilising the NFT service

4. Manta network- For minting Zk SBTs of the tokenised Assets. https://docs.manta.network/docs/developers/manta.js/how-to-mint-zk-sbt

5. Dex Integrations 1inch

Fusion Swap available for Users.

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

1. Fork the repo and install the dependicies.

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
