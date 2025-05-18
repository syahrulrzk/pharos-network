require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // ← Tambahkan baris ini

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    pharosTestnet: {
      url: "https://testnet.dplabs-internal.com ", // RPC Pharos Testnet
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Private key dari akun MetaMask kamu
    }
  }
};
