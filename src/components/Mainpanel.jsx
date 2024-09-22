import React, { useState } from "react"
import Home from "./Home"
import Grid from "@mui/material/Grid2"
import { Box, Card } from "@mui/material"
import Sidepanel from "./Sidepanel"

import '../styles/Mainpanel.css'


const Mainpanel = () => {
  const [body, setBody] = useState(<Home />)

  return (
    <Box sx={{width:'100%', textAlign:'center'}}>
      <Box p={2}>
        <Box sx={{}}>
          <Grid container spacing={2}>
            <Grid size={2}>
              <Sidepanel setBody={setBody}/>
            </Grid>
            <Grid size={10}>
              <Card>
                {body}
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default Mainpanel