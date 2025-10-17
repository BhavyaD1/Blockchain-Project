let web3;
let userAccount;
let contract;

// 🔹 Replace these with your Remix deployment details
const contractAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";
const abi = [
 
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}

];

window.addEventListener("DOMContentLoaded", () => {
  const connectButton = document.getElementById("connectButton");
  const accountSpan = document.getElementById("account");
  const balanceButton = document.getElementById("balanceButton");
  const balanceResult = document.getElementById("balanceResult");
  const depositButton = document.getElementById("depositButton");
  const withdrawButton = document.getElementById("withdrawButton");

  connectButton.onclick = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        userAccount = accounts[0];
        accountSpan.innerText = userAccount;

        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(abi, contractAddress);

        alert("✅ Wallet Connected: " + userAccount);
      } catch (error) {
        console.error(error);
        alert("Connection failed!");
      }
    } else {
      alert("❌ Please install MetaMask first!");
    }
  };

  balanceButton.onclick = async () => {
    try {
      const balance = await web3.eth.getBalance(contractAddress);
      balanceResult.innerText = "Balance: " + web3.utils.fromWei(balance, "ether") + " ETH";
    } catch (err) {
      console.error(err);
    }
  };

  depositButton.onclick = async () => {
    const amount = document.getElementById("depositAmount").value;
    if (!amount) return alert("Enter deposit amount!");

    await contract.methods.deposit().send({
      from: userAccount,
      value: web3.utils.toWei(amount, "ether")
    });
    alert("✅ Deposit successful!");
  };

  withdrawButton.onclick = async () => {
    const amount = document.getElementById("withdrawAmount").value;
    if (!amount) return alert("Enter withdraw amount!");

    await contract.methods.withdraw(web3.utils.toWei(amount, "ether")).send({
      from: userAccount
    });
    alert("✅ Withdrawal successful!");
  };
});
