import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

const MetaMaskButton = () => {
  const { connector } = useWeb3React();

  const onConnectMetaMask = async () => {
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
  }

  const onDisconnectMetaMask = () => {
    if (connector?.deactivate) {
      connector.deactivate()
    } else {
      connector.resetState()
    }
}

  return (
    <>
      <button onClick={onConnectMetaMask}>Metamask</button>
      <button onClick={onDisconnectMetaMask}>Disconnect</button>
    </>
  )
}

export default MetaMaskButton