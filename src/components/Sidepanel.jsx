import Home from "./Home"
import Send from "./Send"
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
            onClick={() => setBody(<Send />)}
          >
            Send
          </Link>
        </div>
      </Box>
    </Card>
  )
}

export default Sidepanel