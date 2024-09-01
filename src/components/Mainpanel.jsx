import { useState } from "react"
import Home from "./Home"
import { Col, Row } from "react-bootstrap"
import Sidepanel from "./Sidepanel"

const Mainpanel = () => {
  const [body, setBody] = useState(<Home/>)

  return (
    <Row>
      <Sidepanel setBody={setBody}/>
      <Col>
        {body}
      </Col>
    </Row>
  )
}

export default Mainpanel