import React, { useEffect, useState } from 'react';
import { getTransfers } from '../utils/Alchemy';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useWeb3React } from '@web3-react/core';
import { Card } from '@mui/material';

const Transactions = () => {
  const { account } = useWeb3React()
  const [transactions, setTransactions] = useState([])

  const headers = ['hash', 'from', 'to', 'value']

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
                    {row[headers[0]]}
                  </TableCell>
                  {console.log(headers)}
                  {headers.slice(1, headers.length).map((header) => (
                    <TableCell align="right">
                      {row[header]}
                    </TableCell>
                  ))}
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