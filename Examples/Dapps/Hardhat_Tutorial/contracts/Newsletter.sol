// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Newsletter is ERC721URIStorage, Ownable{
   

   // Counter for newsletter copy ID
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    //mapping of subscribers
    mapping (address => bool) public subscribed_check;
    address[] private _subscribed;


    constructor() ERC721("Sonarch Newsletter", "SONANEWS") {}

    function subscribe() public {
        require(subscribed_check[msg.sender] == false, "You have already subscribed to this newsletter!");
        subscribed_check[msg.sender] = true;
        _subscribed.push(msg.sender);
    }

    
    function sendNewsletter(string memory tokenURI) public onlyOwner {
        require(_subscribed.length > 0, "There are no subscribers yet...");
        uint256 tokenId = _tokenIdCounter.current();
        // mint a newsletter to all subscribers
        for(uint i = 0; i < _subscribed.length; i++){
            _tokenIdCounter.increment();
            _safeMint(_subscribed[i], tokenId);
            _setTokenURI(tokenId, tokenURI);
            tokenId = _tokenIdCounter.current();
        }

    }

    //override to set base uri
    function _baseURI() internal view virtual override returns(string memory) {
        // can use pinata to post data in a decentralized manner
        return "test";
    }

}