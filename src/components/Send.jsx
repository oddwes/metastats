import { Box, Button, Input, TextField } from '@mui/material';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { sendTransaction } from '../utils/Alchemy';
import { useWeb3React } from '@web3-react/core';


const Send = () => {
  const { account } = useWeb3React()
  const [recipient, setRecipient] = useState()
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [sendEnabled, setSendEnabled] = useState(false)

  const isValidAddress = (address) => {
    if(address.length !== 42) {
      return false
    }
    if(address.slice(0,2) !== '0x') {
      return false
    }
    return true
  }

  const onAddressUpdate = (event) => {
    const address = event.target.value
    if(isValidAddress(address)) {
      setRecipient(address)

      if(amount > 0) {
        setSendEnabled(true)
      }
    } else {
      setSendEnabled(false)
    }
  }

  const onAmountUpdate = (event) => {
    const amount = event.target.value
    if(amount > 0) {
      setAmount(amount)

      if(!!recipient) {
        setSendEnabled(true)
      }
    } else {
      setSendEnabled(false)
    }
  }

  const onClick = () => {
    sendTransaction(account, recipient, amount, setLoading)
  }

  return (
    <Box>
      <Box mb={1}>
        <TextField
          id="to_address"
          label="Send to"
          size="small"
          sx={{width:'30%'}}
          onChange={onAddressUpdate}
        />
      </Box>
      <Box mb={1}>
        <TextField
          id="amount"
          label="Amount"
          size="small"
          type="number"
          onChange={onAmountUpdate}
        />
      </Box>
      <LoadingButton
        variant='contained'
        onClick={onClick}
        loading={loading}
        disabled={!sendEnabled}
      >
        Send
      </LoadingButton>
    </Box>
  )
}

export default Send