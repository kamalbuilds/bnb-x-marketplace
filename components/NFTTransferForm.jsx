import { useState } from "react";
import { Button , FormControl , InputLabel , MenuItem , Select , TextField } from "@mui/material";


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

    // TODO: Send the form data to the smart contract
    // and handle any errors or success responses
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
            {/* Add more options for other chains */}
          </Select>
        </FormControl>

        <FormControl required fullWidth>
          <InputLabel>To Chain</InputLabel>
          <Select value={toChain} onChange={(event) => setToChain(event.target.value)}>
            <MenuItem value={137}>Polygon Mainnet</MenuItem>
            <MenuItem value={250}>Fantom Opera</MenuItem>
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
