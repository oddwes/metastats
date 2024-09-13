import { useState } from "react"
import Home from "./Home"
import Grid from "@mui/material/Grid2"
import { Card, Container } from "@mui/material"
import Sidepanel from "./Sidepanel"
import '../styles/Mainpanel.css'

const Mainpanel = () => {
  const [body, setBody] = useState(<Home/>)

  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <Sidepanel setBody={setBody}/>
        </Grid>
        <Grid xs={10}>
          <Card>
            {body}
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Mainpanel