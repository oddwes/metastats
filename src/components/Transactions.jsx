import React, { useEffect, useState } from 'react';
import { getAssetTransfers } from '../alchemy/Transactions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Transactions = () => {
  const [transactions, setTransactions] = useState()

  const getTransactions = async () => {
    const assetTransfers = await getAssetTransfers()
    setTransactions(assetTransfers)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  const printTransactions = () => {
    if(!transactions) {
      return
    }
    const headers = Object.keys(transactions[0])

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell>{headers[0]}</TableCell>
              {headers.splice(1, headers.length).map((header) => (
                <TableCell align="right">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .map((row) => Object.values(row))
              .map((row) => (
                <TableRow
                  key={row[0]}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  {row.splice(1, row.length).map((column) => (
                    <TableCell align="right">{JSON.stringify(column)}</TableCell>
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
    <div>
      <div>
        {printTransactions()}
      </div>
    </div>
  )
}

export default Transactions