import { useState } from "react"
import Home from "./Home"
import Grid from "@mui/material/Grid2"
import { Container, Box, Card } from "@mui/material"
import Sidepanel from "./Sidepanel"

import '../styles/Mainpanel.css'

const Mainpanel = () => {
  const [body, setBody] = useState(<Home/>)

  return (
    <Container>
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
    </Container>
  )
}

export default Mainpanel