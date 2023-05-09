import React, { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { Box } from '@mui/material';

function SwapData() {
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const endpoint = 'https://open-platform.nodereal.io/a55e259ae5e94c97a7d4e6897e598ddd/pancakeswap-free/graphql';
      const graphQLClient = new GraphQLClient(endpoint);

      const query = gql`
        query GetSwaps {
          swaps(first: 100) {
            id
            timestamp
            amount0In
            amount0Out
            amount1In
            amount1Out
            pair {
              id
            }
          }
        }
      `;

      try {
        const data = await graphQLClient.request(query);
        setSwaps(data.swaps);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Latest Swaps:</h2>
      {swaps.map(swap => (
        <Box
          key={swap.id}
          style={{
            backgroundColor: '#eab676',
            transform: 'rotate(-2deg)',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
            padding: '20px',
            marginBottom: '20px',
            width: '500px',
            margin: '0 auto',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(-4deg)';
            e.currentTarget.style.boxShadow = '4px 4px 20px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotate(-2deg)';
            e.currentTarget.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.3)';
          }}
        >
          <p>Pair: {swap.pair.id}</p>
          <p>Timestamp: {swap.timestamp}</p>
          <p>Amount0In: {swap.amount0In}</p>
          <p>Amount0Out: {swap.amount0Out}</p>
          <p>Amount1In: {swap.amount1In}</p>
          <p>Amount1Out: {swap.amount1Out}</p>
        </Box>
      ))}
    </div>
  );
}

export default SwapData;