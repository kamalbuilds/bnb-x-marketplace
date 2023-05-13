// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IZKBridge {
    function send(uint16 dstChainId, address dstAddress, bytes calldata payload) external payable returns (uint64 sequence);
}
interface IZKBridgeReceiver {
    // @notice ZKBridge endpoint will invoke this function to deliver the message on the destination
    // @param srcChainId - the source endpoint identifier
    // @param srcAddress - the source sending contract address from the source chain
    // @param sequence - the ordered message nonce
    // @param payload - a custom bytes payload from send chain
    function zkReceive(uint16 srcChainId, address srcAddress, uint64 sequence, bytes calldata payload) external;
}

contract NFTReceiver is IZKBridgeReceiver {

    function zkReceive(uint16 srcChainId, address srcAddress, uint64 sequence, bytes calldata payload) external override {
        (
            uint16 tokenChain,
            uint16 toChain,
            uint256 tokenId,
            bytes memory data
        ) = abi.decode(payload, (uint16, uint16, uint256, bytes));
        // Call the receiving contract on this chain
        (bool success, ) = srcAddress.call(abi.encodeWithSignature("receiveNFT(uint16,uint256,bytes)", toChain, tokenId, data));
        require(success, "NFTReceiver: receiveNFT failed");
    }
}
