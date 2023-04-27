// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract XNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    string private _contractURI = "https://nftstorage.link/ipfs/bafkreicmhlfvv3kb2bhi5ygooonwzk7ccqjdlxnp3wfymc7ms7zr6o3ui4";

    constructor() ERC721("CrossChainNFT", "XNFT") {}

    function setContractURI(string memory url) public onlyOwner {
        _contractURI = url;
    }

    function contractURI() public view returns (string memory)
    {
        return _contractURI;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://app-static.particle.network/collections/0x5e763ee03e5a762dd5fa3bd6c507f82311f257cd/";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory)
    {
        return string(abi.encodePacked(_baseURI(), tokenId.toString()));
    }

    function mintTo(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}