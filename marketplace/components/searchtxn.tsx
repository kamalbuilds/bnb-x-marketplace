import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const SearchComponent = () => {
  const apiKey = process.env.NEXT_PUBLIC_NODEREAL;
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const response = await fetch("https://bsc-mainnet.nodereal.io/v1/" + apiKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "nr_getAssetTransfers",
        "params": [
          {
            "category": [
              "external",
              "20"
            ],
            "fromBlock": "0xE81916",
            "toBlock": "0xE81917",
            "order": "asc",
            "excludeZeroValue": false,
            "maxCount": "0x5",
            "pageKey": "qg000000-0075-RyKy-efk2-Fx9n32gAu432"
          }
        ],
        id: 1
      })
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default SearchComponent;
