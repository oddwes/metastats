import { metaMask, useMetaMask } from './metamask'
import Web3 from "web3";

export const connectors = [[metaMask, useMetaMask]]

export const connectWallet = ( async (connector) => {
  const chainId = process.env.REACT_APP_SUPPORT_CHAIN_ID || "5";
  try {
    if (
      chainId &&
      window.ethereum &&
      window.ethereum.networkVersion !== chainId
    ) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(parseInt(chainId)) }],
        });
      } catch (err) {
        console.log("Network changed rejected", err);
      }
    } else {
      try {
        await connector.activate(chainId);
      } catch (err) {
        console.log("User rejected the request", err);
      }
    }
  } catch (error) {
    console.log(error);
  }
})