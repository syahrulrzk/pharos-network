const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`\n📤 Pengirim: ${deployer.address}\n`);

  const zenTokenAddress = "0xdc74ba3eccaad77561eef286f4a638742c200f97";
  const zenToken = await ethers.getContractAt("contracts/ZenithToken.sol:ZenithToken", zenTokenAddress);

  const recipientsData = JSON.parse(fs.readFileSync("scripts/recipients.json", "utf8"));
  const amount = ethers.parseUnits("25", 18); // 25 token dengan 18 desimal

  let nonce = await ethers.provider.getTransactionCount(deployer.address);

  for (const { address } of recipientsData) {
    try {
      console.log(`🕒 Menunggu 20 detik sebelum mengirim ke penerima berikutnya...`);
      await new Promise((resolve) => setTimeout(resolve, 20000));

      const tx = await zenToken.transfer(address, amount, { nonce });
      console.log(`💸 Sent 25 ZEN to ${address}, tx: ${tx.hash} (nonce: ${nonce})`);

      console.log(`⏳ Menunggu konfirmasi transaksi...`);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        console.log(`✅ Sukses: Transaksi diterima di block #${receipt.blockNumber}`);
      } else {
        console.log(`❌ Gagal: Transaksi ditolak oleh jaringan.`);
      }
    } catch (err) {
      console.error(`🚫 Error saat mengirim ke ${address}:`, err.message);
    }

    nonce++;
  }
}

main().catch((error) => {
  console.error(`🛑 Eksekusi script gagal:`, error);
  process.exitCode = 1;
});
