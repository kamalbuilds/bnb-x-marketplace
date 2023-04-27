import React, { useEffect } from 'react';

const projectUuId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectKey = process.env.NEXT_PUBLIC_CLIENT_KEY;
const chainId = 5; // Goerli Network
const baseUrl = 'https://api-market.particle.network';
const url = `${baseUrl}/chains/${chainId}`;


const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          projectUuid: projectUuId,
          projectKey: projectKey,
          page: 1,
          limit: 10,
        });

        const response = await fetch(`${url}?${queryParams}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(JSON.stringify(responseData));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return <div>Home</div>;
};

export default Home;
