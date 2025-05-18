// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PharosReborn is ERC20 {
    constructor() ERC20("PHAROS REBORN", "PHR") {
        // Mint 1 billion tokens with 18 decimals
        _mint(msg.sender, 1_000_000_000 * 10 ** decimals());
    }
}
