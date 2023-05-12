/* pages/_app.js */
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import client from '../graphql/apolloclient';
import DynamicWagmi from '../components/dynamicWagmi';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ApolloProvider client={client}>
        <DynamicWagmi>
          <Navbar />
          <Component {...pageProps} />
        </DynamicWagmi>
      </ApolloProvider>
    </div>
  )
}

export default MyApp