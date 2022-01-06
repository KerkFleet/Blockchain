// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./Token.sol";

contract Newsletter {
    Token _token;
    mapping (address => bool) public subscribed;

    constructor(Token token) {
        _token = token;
    }

    function subscribe() public {
        require(subscribed[msg.sender] == false, "You have already subscribed to this newsletter!");
        subscribed[msg.sender] = true;
        _token.mint(msg.sender, 30000000000000000000);
    }
}
