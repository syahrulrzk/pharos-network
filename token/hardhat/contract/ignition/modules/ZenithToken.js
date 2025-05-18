const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ZenithTokenModule", (m) => {
  const zenToken = m.contract("ZenithToken");

  return { zenToken };
});
