import { Box, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getBalance} from '../utils/Alchemy';
import { useWeb3React } from '@web3-react/core';

const Home = () => {
  const { chainId, account } = useWeb3React()
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const callGetBalance = async () => {
      const response = await getBalance(account)
      setBalance(response)
    }

    if (!!account) {
      callGetBalance()
    } else {
      setBalance()
    }
  }, [account])

  return (
    <Card>
      <Box sx={{textAlign:'center'}} p={2}>
        <div>Account {account}</div>
        <div>Chain {chainId}</div>
        <div>Balance {balance} ETH</div>
      </Box>
    </Card>
  )
}

export default Home