// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";

contract Newsletter is ERC1155, Ownable{

    mapping(uint256 => string) private _tokenURIs;

    // Counter for newsletter copy ID
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    //mapping of subscribers
    mapping (address => bool) public subscribed_check;
    address[] private _subscribed;

    constructor() public ERC1155("https://kerkfleet.github.io/Blockchain/examples/") {
        _tokenIdCounter.increment();
    }

    function uri(uint256 _tokenID) override public view returns (string memory){
        string memory _uri = super.uri(_tokenID);
        return string(
            abi.encodePacked(
                _uri,
                Strings.toString(_tokenID),
                ".json"
            )
        );
    }

    function sendNewsletter() public onlyOwner {
        require(_subscribed.length > 0, "There are no subscribers yet...");
        uint256 tokenId = _tokenIdCounter.current();
        uint[] memory ids = new uint[](2);
        uint[] memory amounts = new uint[](2);

        ids[0] = tokenId;
        ids[1] = 0;
        amounts[0] = 1;
        amounts[1] = 30;

        // mint a newsletter to all subscribers
        for(uint i = 0; i < _subscribed.length; i++)
            _mintBatch(_subscribed[i], ids, amounts, "");

        _tokenIdCounter.increment();

    }

    function subscribe() public {
        require(subscribed_check[msg.sender] == false, "You have already subscribed to this newsletter!");
        subscribed_check[msg.sender] = true;
        _subscribed.push(msg.sender);
    }


    // function uri(uint256 tokenId) public view virtual override returns (string memory) {
    //     require(_exists(tokenId), "ERC1155URIStorage: URI query for nonexistent token");
    //     require(tokenId != 0, "This is a fungible token.");

    //     string memory _tokenURI = _tokenURIs[tokenId];
    //     string memory base = uri(tokenId);

    //     // If there is no base URI, return the token URI.
    //     if (bytes(base).length == 0) {
    //         return _tokenURI;
    //     }
    //     // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
    //     if (bytes(_tokenURI).length > 0) {
    //         return string(abi.encodePacked(base, _tokenURI));
    //     }

    //     return string(abi.encodePacked(base, tokenId.toString()));
    // }

    // function _setURI(uint256 tokenId, string memory _tokenURI) internal virtual override {
    //     require(_exists(tokenId), "ERC1155URIStorage: URI set of nonexistent token");
    //     _tokenURIs[tokenId] = _tokenURI;
    // }

}
