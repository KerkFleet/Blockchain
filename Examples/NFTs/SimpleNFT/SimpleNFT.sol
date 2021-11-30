// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {

    constructor(address owner) ERC721("Thor's Hammer", "HAMR") public {
        _safeMint(owner, 1);
    }

    //override to set base uri
    function _baseURI() internal view virtual override returns(string memory) {
        // can use pinata to post data in a decentralized manner
        return "https://github.com/KerkFleet/Blockchain/edit/master/Examples/NFTs/SimpleNFT/";
    }

    //override to append json file name instead of tokeID since there is only one
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, "tokenURI.json")) : "";
    }


}
