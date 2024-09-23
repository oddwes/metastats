import { Alchemy, Network, Utils, Wallet } from "alchemy-sdk";
import Web3 from "web3";

const API_kEY = process.env.REACT_APP_ALCHEMY_API_KEY

const getAlchemy = () => {
  const config = {
    apiKey: API_kEY,
    network: Network.ETH_SEPOLIA,
  };
  return new Alchemy(config);
}

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

  return await fetch(`https://eth-sepolia.g.alchemy.com/v2/${API_kEY}`, options)
    .then(response => response.json())
    .then(responseJSON => responseJSON.result?.transfers || [])
}

export const sendTransaction = async (sender, recipient, amount, setLoading) => {
  setLoading(true)
  window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [{
        from: sender,
        to: recipient,
        value: Web3.utils.toWei(amount, 'ether'),
        gasLimit: '0x5028',
        maxPriorityFeePerGas: '0x3b9aca00',
        maxFeePerGas: '0x2540be400',
      }]
    })
    .then((txHash) => {
      console.log(txHash)
      setLoading(false)
    })
    .catch((error) => console.error(error))
}