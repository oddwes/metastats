import { useState } from "react"
import Home from "./Home"
import { Card, Col, Row } from "react-bootstrap"
import Sidepanel from "./Sidepanel"
import '../styles/Mainpanel.css'

const Mainpanel = () => {
  const [body, setBody] = useState(<Home/>)

  return (
    <Row className="body">
      <Col xs={2}>
        <Sidepanel setBody={setBody}/>
      </Col>
      <Col>
        <Card>
          {body}
        </Card>
      </Col>
    </Row>
  )
}

export default Mainpanel