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
        method: "txpool_content",
        params: [],
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
