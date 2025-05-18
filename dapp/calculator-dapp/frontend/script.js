let web3;
let calculatorContract;
const contractAddress = "0x69b22e1e25D6912Da7e5b2411B5d9E9f8db2879c"; // Alamat kontrak baru

async function initWeb3() {
  if (typeof Web3 === 'undefined') {
    console.error("Web3 tidak ditemukan. Pastikan internet aktif dan ad-blocker dimatikan.");
    alert("Web3 tidak ditemukan. Matikan ad-blocker dan coba lagi.");
    return;
  }

  try {
    web3 = new Web3(window.ethereum);

    // Minta akses akun
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Muat ABI
    const response = await fetch('abi.json');
    const abi = await response.json();

    calculatorContract = new web3.eth.Contract(abi, contractAddress);
    console.log("Web3 & Kontrak berhasil diinisialisasi!");
  } catch (error) {
    console.error("Error inisialisasi Web3:", error);
    alert("Gagal terhubung ke MetaMask atau kontrak.");
  }
}

async function calculate(funcName) {
  if (!calculatorContract) {
    alert("Kontrak belum siap. Tunggu beberapa detik dan coba lagi.");
    return;
  }

  const a = parseInt(document.getElementById("numA").value);
  const b = parseInt(document.getElementById("numB").value);

  if (isNaN(a) || isNaN(b)) {
    alert("Masukkan kedua angka!");
    return;
  }

  try {
    const accounts = await web3.eth.getAccounts();
    let result;

    switch (funcName) {
      case 'add':
        const receiptAdd = await calculatorContract.methods.add(a, b).send({ from: accounts[0] });
        const dataAdd = receiptAdd.events.EventResult.returnValues;
        result = dataAdd.result;
        break;

      case 'subtract':
        const receiptSub = await calculatorContract.methods.subtract(a, b).send({ from: accounts[0] });
        const dataSub = receiptSub.events.EventResult.returnValues;
        result = dataSub.result;
        break;

      case 'multiply':
        const receiptMul = await calculatorContract.methods.multiply(a, b).send({ from: accounts[0] });
        const dataMul = receiptMul.events.EventResult.returnValues;
        result = dataMul.result;
        break;

      case 'divide':
        const receiptDiv = await calculatorContract.methods.divide(a, b).send({ from: accounts[0] });
        const dataDiv = receiptDiv.events.EventResult.returnValues;
        result = dataDiv.result;
        break;

      default:
        alert("Operasi tidak dikenal");
        return;
    }

    // Tampilkan hasil
    const resultEl = document.getElementById("result");
    resultEl.innerText = result;

    // Alert sukses
    alert(`✅ Operasi berhasil!\n${a} ${getOperator(funcName)} ${b} = ${result}`);

    // Efek warna hijau sebentar
    resultEl.style.color = "green";
    setTimeout(() => {
      resultEl.style.color = "black";
    }, 1500);

  } catch (error) {
    console.error("Detail error:", error);

    if (error.code === -32000 || error.message.includes("reverted")) {
      alert("Transaksi dibatalkan atau gagal. Mungkin pembagian dengan nol atau kontrak tidak bisa dipanggil.");
    } else if (error.message.includes("network")) {
      alert("Gagal terhubung ke jaringan. Pastikan MetaMask terhubung ke Pharos Testnet.");
    } else {
      alert("Terjadi kesalahan: " + error.message);
    }
  }
}

// Helper untuk mendapatkan simbol operator
function getOperator(op) {
  switch (op) {
    case 'add': return '+';
    case 'subtract': return '-';
    case 'multiply': return '×';
    case 'divide': return '÷';
    default: return '';
  }
}

// Fungsi untuk ambil dan tampilkan riwayat operasi
async function getHistory() {
  if (!calculatorContract) {
    alert("Kontrak belum siap. Coba muat ulang halaman.");
    return;
  }

  try {
    const history = await calculatorContract.methods.getResults().call();
    const historyList = document.getElementById("history");
    historyList.innerHTML = ""; // Kosongkan sebelumnya

    if (history.length === 0) {
      historyList.innerHTML = "<li>Belum ada operasi yang dilakukan.</li>";
      return;
    }

    history.forEach((result, index) => {
      const li = document.createElement("li");
      li.textContent = `#${index + 1}: ${result.toString()}`;
      historyList.appendChild(li);
    });
  } catch (error) {
    console.error("Gagal ambil riwayat:", error);
    alert("Gagal mengambil riwayat dari kontrak.");
  }
}

// Jalankan setelah DOM siap
window.addEventListener('load', () => {
  setTimeout(initWeb3, 1000); // Delay 1 detik untuk pastikan Web3 sudah dimuat
});
