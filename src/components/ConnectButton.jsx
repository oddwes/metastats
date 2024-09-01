import { useWeb3React } from "@web3-react/core";
import "../styles/ConnectButton.css"
import { connectWallet } from "../utils/connectors";
import metamask_logo from "../assets/images/metamask.png"

const MetaMaskButton = () => {
  const { connector, isActive } = useWeb3React();

  const onDisconnectMetaMask = () => {
    if (connector?.deactivate) {
      connector.deactivate()
    } else {
      connector.resetState()
    }
  }

  const buttonText = isActive ? 'Disconnect' : 'Metamask'
  const onClick = isActive
    ? onDisconnectMetaMask
    : () => connectWallet(connector)

  return (
    <div className="d-flex justify-content-end">
      <button onClick={onClick} className="connect-button">
        <img src={metamask_logo} width="30" height="30" alt="metamask_logo"/>
        {buttonText}
      </button>
    </div>
  )
}

export default MetaMaskButton