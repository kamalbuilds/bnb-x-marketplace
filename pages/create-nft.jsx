import { useState } from "react";
import { ContractFactory, ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { NFTStorage } from 'nft.storage';
import Image from "next/image";
import { marketplaceAddress } from "../config";
import NFTMarketplace from "../abi/NFTMarketplace.json";

console.log(NFTMarketplace,"NFTMarketplace abi");
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
    const nftstorage_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVERWJCMEZCNTk3REI4MTUxNkU5M2Y4YmM3RjJmQ0Q2ODYzNDAyOEUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1ODU4MDY5OTE4MSwibmFtZSI6Ik11c2ljMyJ9.V6Ny_9VV_XLIIFDFIEG8alEdJTwxmfHJMaMDJEf00L4";
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
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, "ether");
    const gasPrice = await provider.getGasPrice();
    const gasLimit = 200000;
    const value = ethers.BigNumber.from(price).add(gasPrice.mul(gasLimit));
    let contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace,
      signer
    );
    console.log(contract,"contract");
    // const value = ethers.utils.parseUnits("0.0001", "ether");
    // let listingPrice = await contract.getListingPrice();
    // listingPrice = listingPrice.toString();
    let transaction = await contract.createToken(url, price, {
      value: value,
      gasLimit: gasLimit,
      gasPrice: gasPrice
    });
    await transaction.wait();
    console.log(transaction,"transaction");

    router.push("/");
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