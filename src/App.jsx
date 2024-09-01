import { Container } from 'react-bootstrap';
import './App.css';
import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { connectors } from './utils/connectors';
import Header from './components/Header';
import Mainpanel from './components/Mainpanel';

function App() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <div className="App">
        <Container fluid>
          <Header />
          <Mainpanel />
        </Container>
      </div>
    </Web3ReactProvider>
  );
}

export default App;
