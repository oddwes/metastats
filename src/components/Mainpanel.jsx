import React from "react"
import Home from "./Home"
import Grid from "@mui/material/Grid2"
import { Box } from "@mui/material"

import '../styles/Mainpanel.css'
import Send from "./Send"
import Transactions from "./Transactions"


const Mainpanel = () => {
  return (
    <Box sx={{width:'100%', textAlign:'center'}}>
      <Box pt={2} pr={2} pl={2}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Home />
          </Grid>
          <Grid size={8}>
            <Send />
          </Grid>
        </Grid>
      </Box>
      <Grid container>
          <Grid>
            <Box pt={2} pr={2} pl={2}>
              <Transactions />
            </Box>
          </Grid>
      </Grid>
    </Box>
  )
}

export default Mainpanel