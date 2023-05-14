import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import { useContractRead } from 'wagmi';
import {
  marketplaceAddress
} from '../config';

import NFTMarketplace from '../abi/NFTMarketplace.json';

export default function Home() {
  // const { getdata , isError, isLoading } = useContractRead({
  //   address: marketplaceAddress,
  //   abi: NFTMarketplace,
  //   method: 'getListingPrice',
  // });
  // console.log('data:', getdata , isError, isLoading);
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded')

  async function LoadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace, provider);
    const data = await contract.fetchMarketItems();
    console.log(data,"data fetched market items");

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
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

  useEffect(() => {
    if (typeof window.ethereum != 'undefined') {
      LoadNFTs();
    }
  }, []);

  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait();
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)

  return (
    <div className="flex justify-center">
      <div className="p-4" style={{ width: '80%' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden wrapper">
                <div className='mx-24'>
                  <Image src={nft.image} alt="nft image" width="100" height="100" />
                </div>
                <div className="p-4 text-center">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold "> {nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-indigo-800"> Description - {nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white text-center">{nft.price} ETH</p>
                  <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}