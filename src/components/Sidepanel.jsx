import Home from "./Home"
import Performance from "./Performance"
import Transactions from "./Transactions"
import { Card, Box, Link } from "@mui/material"

const Sidepanel = ({ setBody }) => {
  return (
    <Card className="dark-background">
      <Box p={2}>
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
      </Box>
    </Card>
  )
}

export default Sidepanel