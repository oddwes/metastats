import { Col, Container, Nav, Row } from 'react-bootstrap';
import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Web3ReactProvider } from '@web3-react/core';
import { connectors } from './connectors';
import MetaMaskButton from './components/MetaMaskButton';

function App() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <div className="App">
        <Container fluid>
          <Row>
            <Col xs={2} className="sidebar">
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/performance">Performance</Nav.Link>
                <Nav.Link href="/transactions">Transactions</Nav.Link>
              </Nav>
            </Col>
            <Col>
              <RouterProvider router={router} />
            </Col>
          </Row>
          <MetaMaskButton />
        </Container>
      </div>
    </Web3ReactProvider>
  );
}

export default App;
