import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://open-platform.nodereal.io/{a55e259ae5e94c97a7d4e6897e598ddd}/uniswap/graphql/',
    cache: new InMemoryCache()
  });
  
  export default client;