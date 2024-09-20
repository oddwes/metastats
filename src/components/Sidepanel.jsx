import Home from "./Home"
import Performance from "./Performance"
import Transactions from "./Transactions"
import { Card, Container, Link } from "@mui/material"

const Sidepanel = ({setBody}) => {
  return (
    <Card className="dark-background">
      <Container>
        <div>
          <Link
            href='#'
            underline='none'
            onClick={() => setBody(<Home />)}
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            href='#'
            underline='none'
            onClick={() => setBody(<Transactions />)}
          >
            Transactions
          </Link>
        </div>
        <div>
          <Link
            href='#'
            underline='none'
            onClick={() => setBody(<Performance />)}
          >
            Performance
          </Link>
        </div>
      </Container>
    </Card>
  )
}

export default Sidepanel