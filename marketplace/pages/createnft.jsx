import { useState } from "react";
import { ContractFactory, ethers } from "ethers";
import { useRouter } from "next/router";
import { NFTStorage } from 'nft.storage';
import Image from "next/image";
import { marketplaceAddress } from "../config.js";
import NFTMarketplace from "../abi/NFTMarketplace.json";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    const nftstorage_key = process.env.NEXT_PUBLIC_NFTSTORAGE;
    const client = new NFTStorage({ token: nftstorage_key });
  
    const metadata = await client.store({
      name: formInput.name,
      description: formInput.description,
      image: new File([file], file.name, { type: file.type }),
    });
  
    const url = metadata.url;
    setFileUrl(url);
  }

  async function uploadToIPFS() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
  
    const url = fileUrl;
    console.log(url,"url");
    return url;
  }
  
  async function listNFTForSale() {
    const url = await uploadToIPFS();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace,
      signer
    );
    console.log(contract,"contract");
    const price = ethers.utils.parseUnits(formInput.price, 'ether');
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    await transaction.wait()
   
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && (
  <div className="rounded mt-4" style={{ width: '350px', height: '350px' }}>
    <Image src={fileUrl} alt="NFT Image" width={350} height={350} loader={() => fileUrl} className="rounded" />
  </div>
)}

        <button
          onClick={listNFTForSale}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
      </div>
    </div>
  );
}