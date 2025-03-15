import { ethers } from "ethers";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

// Define the shape of our component's state
interface WalletData {
  address: string;
  balance: string;
}

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: ethers.providers.ExternalProvider;
  }
}

const CryptoWallet: React.FC = () => {
  const [data, setData] = useState<WalletData>({
    address: "",
    balance: "0",
  });

  // Function to handle account changes
  const accountChangeHandler = async (account: string) => {
    // Update address in state
    setData((prevData) => ({
      ...prevData,
      address: account,
    }));

    // Fetch and update balance
    await getBalance(account);
  };

  // Function to get the balance of an address
  const getBalance = async (address: string) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      setData((prevData) => ({
        ...prevData,
        balance: ethers.utils.formatEther(balance),
      }));
    }
  };

  // Function to handle button click
  const btnHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum?.request?.({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          await accountChangeHandler(accounts[0]);
        }
      } catch (err) {
        console.error("Error connecting to metamask", err);
      }
    } else {
      alert("Please install MetaMask extension!");
    }
  };

  return (
    <div>
      <Button onClick={btnHandler} variant="primary">
        Connect to wallet
      </Button>
      {data.address && (
        <div>
          <p>Address: {data.address}</p>
          <p>Balance: {data.balance} ETH</p>
        </div>
      )}
    </div>
  );
};

export default CryptoWallet;
