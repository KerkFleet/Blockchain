// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./Token.sol";

contract Newsletter {
    Token _token;

    constructor(Token token) {
        _token = token;
    }

    function subscribe() public {
        _token.mint(msg.sender, 10000000000000000000);
    }
}
