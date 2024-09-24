import { Box, Card, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { getMaxPriorityFeePerGas, sendTransaction } from '../utils/Alchemy';
import { useWeb3React } from '@web3-react/core';


const Send = () => {
  const { account } = useWeb3React()
  const [recipient, setRecipient] = useState()
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [sendEnabled, setSendEnabled] = useState(false)
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState()

  useEffect(() => {
    getMaxPriorityFeePerGas(setMaxPriorityFeePerGas)
  }, [])

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
    <Card>
      <Box p={2}>
        <Box mb={2}>
          <TextField
            id="from_address"
            label="From"
            size="small"
            sx={{width:'60%'}}
            value={account}
            readOnly={true}
          />
        </Box>
        <Box mb={2}>
          <TextField
            id="to_address"
            label="To"
            size="small"
            sx={{width:'60%'}}
            onChange={onAddressUpdate}
            slotProps={{
              inputLabel: {
                shrink: true,
              }
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            id="amount"
            label="Amount"
            size="small"
            type="number"
            sx={{width:'40%'}}
            onChange={onAmountUpdate}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                endAdornment: <InputAdornment position="end">ETH</InputAdornment>
              },
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            id="max_priority_fee_per_gas"
            label="MaxPriorityFeePerGas"
            size="small"
            type="number"
            sx={{width:'40%'}}
            value={maxPriorityFeePerGas}
            readOnly={true}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                endAdornment: <InputAdornment position="end">ETH</InputAdornment>
              },
            }}
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
    </Card>
  )
}

export default Send