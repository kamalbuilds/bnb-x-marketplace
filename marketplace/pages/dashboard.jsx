import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
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

    const data = await contract.fetchMyNFTs();
    console.log(data, "data");

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const metadataUri = tokenUri.replace('ipfs://', 'https://ipfs.io/ipfs/');
      console.log(metadataUri, "metadataUri");
      const meta = await axios.get(metadataUri);
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      const img = meta.data.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
      console.log(img, "img");
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: img,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items);
    setLoadingState('loaded');
  }

  async function transferNFT(nft) {
    setTransfer(true);
  }

  if(loadingState !== 'loaded') return (<div className="flex justify-center"><CircularProgress /></div>);
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items owned</h1>)

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <Image src={nft.image} alt="nft image" width="100" height="100" />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
                </div>
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