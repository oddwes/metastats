import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const { isActive, chainId, account } = useWeb3React();

  return (
    <header>
      <div>Connection Status: {isActive ? 'Active':'Inactive'}</div>
      <div>Account {account}</div>
      <div>Chain ID {chainId}</div>

    </header>
  )
}

export default Home