The transferNFT function is called by the sender with the following parameters:
* _nftAddress: the address of the ERC721 contract that holds the NFT to transfer
* _tokenId: the ID of the NFT to transfer
* _tokenChain: the ID of the chain where the NFT is originally from
* _toChain: the ID of the chain where the recipient is located
* _dstChainId: the ID of the destination chain
* _dstAddress: the address of the IZKBridgeEntrypoint contract on the destination chain

The function gets the ERC721 contract using the _nftAddress parameter and approves the transfer of the NFT to itself so it can hold it temporarily.
The function encodes the transfer data into a bytes payload.
The function calls the send function on the destination chain's IZKBridgeEntrypoint contract with the destination chain ID, the address of the current contract, and the payload.
The sender pays a fee for the cross-chain transfer using msg.value.
The function transfers the NFT to the recipient on the source chain.