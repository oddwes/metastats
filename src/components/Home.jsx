import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const Home = () => {
  const { isActive, chainId, account } = useWeb3React()
  const [balance, setBalance] = useState(0)

  const getBalance = async () => {
    if(isActive) {
      window.web3 = new Web3(window.ethereum)
      const balance = await window.web3.eth.getBalance(account)
      setBalance(window.web3.utils.fromWei(balance, 'ether'))
    }
  }

  useEffect(() => {
    getBalance()
  }, [isActive])

  return (
    <header>
      <div>Connection Status: {isActive ? 'Active':'Inactive'}</div>
      <div>Account {account}</div>
      <div>Chain ID {chainId}</div>
      <div>Balance {balance} ETH</div>

    </header>
  )
}

export default Home