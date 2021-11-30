// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract KerkToken is ERC20 {
    constructor() ERC20("KerkFleet", "KERK") {
        _mint(msg.sender, 100000000000000000000000);
    }
}
