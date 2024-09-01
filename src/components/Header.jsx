import { Row } from "react-bootstrap"
import MetaMaskButton from "./ConnectButton"
import { connectWallet } from "../utils/connectors";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

const Header = () => {
  const { connector } = useWeb3React();

  useEffect(() => {
    connectWallet(connector)
  }, [])

  return (
    <Row className="dark-background header">
      <MetaMaskButton />
    </Row>
  )
}

export default Header