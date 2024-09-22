import { Alchemy, Network } from "alchemy-sdk";
import Web3 from "web3";

export const getTransactionCount = async (address) => {
  const alchemy = getAlchemy()
  return await alchemy.core.getTransactionCount(address)
}

export const getBalance = async (address) => {
  const alchemy = getAlchemy()
  return await alchemy.core.getBalance(address, "latest")
    .then(response => response.toHexString())
    .then(balanceInHex => Web3.utils.hexToNumberString(balanceInHex))
    .then(balanceInWei => Web3.utils.fromWei(balanceInWei, 'ether'))
}

export const getTransfers = async (address, direction) => {
  const params = {
    order: 'desc',
    excludeZeroValue: true,
    category: ['external','internal','erc20','erc721','erc1155'],
  }

  if (direction === 'to') {
    params.toAddress = address
  } else {
    params.fromAddress = address
  }

  const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      params: params,
      method: 'alchemy_getAssetTransfers'
    })
  };

  const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY
  return await fetch(`https://eth-sepolia.g.alchemy.com/v2/${apiKey}`, options)
    .then(response => response.json())
    .then(responseJSON => responseJSON.result?.transfers || [])
}

const getAlchemy = () => {
  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
  };
  return new Alchemy(config);
}