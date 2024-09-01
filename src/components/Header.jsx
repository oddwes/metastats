import { Row } from "react-bootstrap"
import MetaMaskButton from "./ConnectButton"

const Header = () => {
  return (
    <Row className="dark-background header">
      <MetaMaskButton />
    </Row>
  )
}

export default Header