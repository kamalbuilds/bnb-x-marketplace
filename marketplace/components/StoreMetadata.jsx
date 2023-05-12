import { NFTStorage } from "nft.storage";

/// used NFT.storage to prepare the metadata for the NFT
export const StoreMetadata = async (image, Name, Description) => {
  const nftstorage_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVERWJCMEZCNTk3REI4MTUxNkU5M2Y4YmM3RjJmQ0Q2ODYzNDAyOEUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1ODU4MDY5OTE4MSwibmFtZSI6Ik11c2ljMyJ9.V6Ny_9VV_XLIIFDFIEG8alEdJTwxmfHJMaMDJEf00L4";
  console.log(nftstorage_key,'key');

  console.log("Preparing Metadata ....");
  const nft = {
    image: image,
    name: Name,
    description: Description,
  };
  console.log("Uploading Metadata to IPFS ....");
  const client = new NFTStorage({ token: nftstorage_key });
  console.log(client,"client");
  const metadata = await client.store(nft);
  console.log(metadata);
  console.log("NFT data stored successfully 🚀🚀");
  console.log("Metadata URI: ", metadata.url);

  return metadata;
};