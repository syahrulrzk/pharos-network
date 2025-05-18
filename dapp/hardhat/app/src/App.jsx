import React, { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0xc50e7bf6e65c48287667ad190beb00e4837e0acb";
const abi = [
  {
    inputs: [],
    name: "get",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "x", type: "uint256" }],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

function App() {
  const [value, setValue] = useState("");
  const [storedValue, setStoredValue] = useState("");

  const handleSet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.set(value);
      await tx.wait();
      alert("Value set!");
    } catch (error) {
      alert("Error saat set value: " + error.message);
    }
  };

  const handleGet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);

      const result = await contract.get();
      setStoredValue(result.toString());
    } catch (error) {
      alert("Error saat get value: " + error.message);
    }
  };

  return (
    <div>
      <h1>Simple Storage dApp</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a value"
      />
      <button onClick={handleSet}>Set Value</button>
      <button onClick={handleGet}>Get Value</button>
      <p>Stored Value: {storedValue}</p>
    </div>
  );
}

export default App;
