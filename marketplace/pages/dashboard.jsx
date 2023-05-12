import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import CircularProgress from '@mui/material';

import {
  marketplaceAddress
} from '../config'
import NFTTransferForm from '../components/NFTTransferForm';
import NFTMarketplace from '../abi/NFTMarketplace.json';
import { Button } from '@mui/material';

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [transfer, setTransfer] = useState(false);

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace, signer);
    const data = await contract.fetchItemsListed();
  
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      const metadataUri = tokenUri.replace('ipfs://', 'https://nftstorage.link/ipfs/');
  
      const response = await fetch(metadataUri);
      if (!response.ok) {
        throw new Error(`Failed to fetch metadata from ${metadataUri}. Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Invalid content type. Expected application/json but received ${contentType}`);
      }
  
      const meta = await response.json();
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.image,
      }
      return item;
    }));
  
    setNfts(items);
    setLoadingState('loaded'); 
  }
  
  if (loadingState === 'not-loaded') {
    return <h1>Loading...</h1>;
  }

  if (loadingState === 'loaded' && !nfts.length) {
    return (<h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>);
  }

  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Listed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <div className="p-4 bg-black">
                  <p className='text-2xl font-bold text-white'>Token Id- {nft.tokenId}</p>
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
                <Image
                  src="https://bafybeieizgygxn3cntvweblnsuooughosdqsk7rz34izx33nupsltstezu.ipfs.dweb.link/king.png"
                  alt="nft img"
                  width={100}
                  height={100}
                  className="rounded"
                />
                <p className="text-2xl font-bold ">Owner - {nft.owner}</p>
              </div>
            ))
          }
        </div>
      </div>
      <Button onClick={() => setTransfer(!transfer)} variant="contained" color="primary" className='mx-4'>Transfer NFT</Button>
        {transfer && <NFTTransferForm />}
    </div>
  )
}