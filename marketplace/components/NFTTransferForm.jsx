import { useState } from "react";
import { Button , FormControl , InputLabel , MenuItem , Select , TextField } from "@mui/material";
import ABI from "./abi.json"

import { ethers } from "ethers";

export default function NFTTransferForm() {
  const [nftAddress, setNFTAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenChain, setTokenChain] = useState("");
  const [toChain, setToChain] = useState("");
  const [dstChainId, setDstChainId] = useState("");
  const [dstAddress, setDstAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error("Please install MetaMask to interact with the Ethereum network");
      }

      // Request access to the user's MetaMask account
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get the provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Get the signer
      const signer = provider.getSigner();

      // Create an instance of the NFTBridge contract
      const contractAddress = "0x193E5a370D0CEc949dA625E340fad75D4b6dfF7D";
      const contractABI = ABI;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Convert the chain IDs to numbers
      const tokenChainId = Number(tokenChain);
      const toChainId = Number(toChain);
      const destinationChainId = Number(dstChainId);

      // Convert the token ID to a BigNumber
      const tokenIdBN = ethers.BigNumber.from(tokenId);

      // Call the transferNFT function on the contract
      const tx = await contract.transferNFT(
        nftAddress,
        tokenIdBN,
        tokenChainId,
        toChainId,
        destinationChainId,
        dstAddress
      );

      // Wait for the transaction to be mined
      await tx.wait();

      // Reset the form fields
      setNFTAddress("");
      setTokenId("");
      setTokenChain("");
      setToChain("");
      setDstChainId("");
      setDstAddress("");

      // Show success message to the user
      alert("NFT transferred successfully!");
    } catch (error) {
      console.error(error);
      // Show error message to the user
      alert("An error occurred while transferring the NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          required
          label="NFT Address"
          variant="outlined"
          fullWidth
          value={nftAddress}
          onChange={(event) => setNFTAddress(event.target.value)}
        />

        <TextField
          required
          label="Token ID"
          variant="outlined"
          fullWidth
          type="number"
          value={tokenId}
          onChange={(event) => setTokenId(event.target.value)}
        />

        <FormControl required fullWidth>
          <InputLabel>Token Chain</InputLabel>
          <Select value={tokenChain} onChange={(event) => setTokenChain(event.target.value)}>
            <MenuItem value={1}>Ethereum Mainnet</MenuItem>
            <MenuItem value={137}>Polygon Mainnet</MenuItem>
            <MenuItem value={250}>Fantom Opera</MenuItem>
            <MenuItem value={5}>Goreli</MenuItem>
            <MenuItem value={80001}>Polygon testnet</MenuItem>
            <MenuItem value={4001}>Fantom testnet</MenuItem>
            {/* Add more options for other chains */}
          </Select>
        </FormControl>

        <FormControl required fullWidth>
          <InputLabel>To Chain</InputLabel>
          <Select value={toChain} onChange={(event) => setToChain(event.target.value)}>
            <MenuItem value={137}>Polygon Mainnet</MenuItem>
            <MenuItem value={250}>Fantom Opera</MenuItem>
            <MenuItem value={5}>Goreli</MenuItem>
            <MenuItem value={80001}>Polygon testnet</MenuItem>
            <MenuItem value={4001}>Fantom testnet</MenuItem>
            {/* Add more options for other chains */}
          </Select>
        </FormControl>

        <TextField
          required
          label="Destination Chain ID"
          variant="outlined"
          fullWidth
          type="number"
          value={dstChainId}
          onChange={(event) => setDstChainId(event.target.value)}
        />

        <TextField
          required
          label="Destination Address"
          variant="outlined"
          fullWidth
          value={dstAddress}
          onChange={(event) => setDstAddress(event.target.value)}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
          {loading ? "Loading..." : "Transfer NFT"}
        </Button>
      </form>
  );
}
