import React, { useEffect, useState } from 'react';
import { getBlock, getTransfers, parseBigInt, parseTimeStamp } from '../utils/Alchemy';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useWeb3React } from '@web3-react/core';
import { Card } from '@mui/material';
import dayjs from 'dayjs';

const Transactions = () => {
  const { account } = useWeb3React()
  const [transactions, setTransactions] = useState([])
  const [blocks, setBlocks] = useState({})

  const headers = ['blockNum', 'date', 'hash', 'from', 'to', 'value', 'gas used']

  useEffect(() => {
    const getTransactions = async () => {
      if(!!account) {
        const assetTransfers = []
        let response
        response = await getTransfers(account, 'from')
        assetTransfers.push(...response)
        response = await getTransfers(account, 'to')
        assetTransfers.push(...response)
        setTransactions(assetTransfers)
      }
    }

    getTransactions()
  }, [account])

  useEffect(() => {
    const getBlockData = async () => {
      transactions.forEach(async (transaction) => {
        const response = await getBlock(transaction.blockNum)
        blocks[transaction.blockNum] = response
        setBlocks({...blocks})
      })
    }
    getBlockData()
  }, [transactions])

  const printTransactions = () => {
    if(transactions.length < 1) {
      return
    }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell>{headers[0]}</TableCell>
              {headers.slice(1, headers.length).map((header) => (
                <TableCell align="right">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .map((row) => (
                <TableRow
                  key={row.hash}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.blockNum}
                  </TableCell>
                  <TableCell align="right"><div>{parseTimeStamp(blocks[row.blockNum]?.timestamp)}</div></TableCell>
                  <TableCell align="right">{row.hash}</TableCell>
                  <TableCell align="right">{row.from}</TableCell>
                  <TableCell align="right">{row.to}</TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">{parseBigInt(blocks[row.blockNum]?.gasUsed)}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <Card>
      {printTransactions()}
    </Card>
  )
}

export default Transactions