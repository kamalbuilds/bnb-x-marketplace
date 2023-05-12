// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IZKBridgeEntrypoint {
    // @notice send a ZKBridge message to the specified address at a ZKBridge endpoint.
    // @param dstChainId - the destination chain identifier
    // @param dstAddress - the address on destination chain
    // @param payload - a custom bytes payload to send to the destination contract
    function send(uint16 dstChainId, address dstAddress, bytes memory payload) external payable returns (uint64 sequence);
}

contract NFTBridge {
    function transferNFT(
        address _nftAddress,
        uint256 _tokenId,
        uint16 _tokenChain,
        uint16 _toChain,
        uint16 _dstChainId,
        address _dstAddress
    ) external payable {
        // Get the ERC721 contract and approve the transfer of the NFT to the contract
        IERC721 nft = IERC721(_nftAddress);
        nft.approve(address(this), _tokenId);

        // Encode the transfer data into a bytes payload
        bytes memory payload = abi.encode(
            _tokenId,     // ID of the NFT to transfer
            _tokenChain,  // Chain ID of the NFT
            _toChain      // Chain ID of the recipient
        );

        // Send the payload to the destination chain
        IZKBridgeEntrypoint(_dstAddress).send{value: msg.value}(_dstChainId, address(this), payload);

        // Transfer the NFT to the recipient on this chain
        nft.transferFrom(address(this), msg.sender, _tokenId);
    }
}
