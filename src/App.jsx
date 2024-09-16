import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { connectors } from './utils/connectors';
import Header from './components/Header';
import Mainpanel from './components/Mainpanel';

import './App.css';

function App() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Header />
      <Mainpanel />
    </Web3ReactProvider>
  );
}

export default App;
