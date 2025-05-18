const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // ✅ Tambahkan alamat kontrak token kamu di sini
  const zenTokenAddress = "0xdc74ba3eccaad77561eef286f4a638742c200f97"; // Ganti dengan alamat kontraknya yang valid

  const zenToken = await ethers.getContractAt("ZenithToken", zenTokenAddress);

  const recipientsData = JSON.parse(fs.readFileSync("scripts/recipients.json", "utf8"));
  const amount = ethers.parseUnits("25", 18);

    // ✅ Ganti baris ini:
  let nonce = await ethers.provider.getTransactionCount(deployer.address);

  for (const { address } of recipientsData) {
    const tx = await zenToken.transfer(address, amount, { nonce });
    console.log(`Sent 25 ZEN to ${address}, tx: ${tx.hash}`);
    nonce++;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
