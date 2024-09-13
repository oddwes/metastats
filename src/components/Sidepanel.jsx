import { Card, Col, Nav } from "react-bootstrap"
import '../styles/Sidepanel.css'
import Home from "./Home"
import Performance from "./Performance"
import Transactions from "./Transactions"

const Sidepanel = ({setBody}) => {
  return (
    <Card className="dark-background">
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link
          className="link"
          onClick={() => setBody(<Home />)}
        >
          Home
        </Nav.Link>
        <Nav.Link
          className="link"
          onClick={() => setBody(<Performance />)}
        >
          Performance
        </Nav.Link>
        <Nav.Link
          className="link"
          onClick={() => setBody(<Transactions />)}
        >
          Transactions
        </Nav.Link>
      </Nav>
    </Card>
  )
}

export default Sidepanel