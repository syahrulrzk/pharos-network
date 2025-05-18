// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZenithToken is ERC20 {
    constructor() ERC20("Zenith Bulk", "ZEN") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
