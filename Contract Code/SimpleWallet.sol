// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleWallet {
    address public owner;

    constructor() {
        owner = msg.sender; // set contract deployer as owner
    }

    // Deposit funds (default payable function)
    function deposit() public payable {}

    // Withdraw funds to a specified address
    function withdraw(uint amount) public {
        require(msg.sender == owner, "Only owner can withdraw");
        require(amount <= address(this).balance, "Insufficient balance");
        payable(msg.sender).transfer(amount);
    }

    // Check contract balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
