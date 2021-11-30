// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";


contract Newsletter is ERC721 {
   

   // Counter for newsletter copy ID
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    //mapping of subscribers
    mapping (address => bool) public subscribed;

    // Newsletter edition
    string private _edition;

    constructor(string memory edition) ERC721("Sonarch Newsletter", "SONANEWS") public {
        _edition = edition;
    }

    function subscribe() public {
        require(subscribed[msg.sender] == false, "You have already subscribed to this newsletter!");
        subscribed[msg.sender] = true;

        //mint the newsletter
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

    }


    //override to set base uri
    function _baseURI() internal view virtual override returns(string memory) {
        // can use pinata to post data in a decentralized manner
        return "https://github.com/KerkFleet/Blockchain/blob/master/Examples/ERC721/BasicNewsletter/Metadata/";
    }

    //override to append edition name for this contract
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, _edition)) : "";
    }

}
