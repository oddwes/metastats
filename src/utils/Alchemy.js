import { Alchemy, Network, Utils } from "alchemy-sdk";
import Web3 from "web3";
import dayjs from "dayjs";

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
    .then(response => parseBigInt(response))
    // .then(balanceInHex => Web3.utils.hexToNumberString(balanceInHex))
    // .then(balanceInWei => Web3.utils.fromWei(balanceInWei, 'ether'))
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

export const getBlock = async (blockNum) => {
  const alchemy = getAlchemy()
  return await alchemy.core.getBlock(blockNum)
}

export const getMaxPriorityFeePerGas = async (setMaxPriorityFeePerGas) => {
  await getAlchemy().transact.getMaxPriorityFeePerGas()
    .then(weiValue => Utils.formatUnits(weiValue, "ether"))
    .then(feeInEther => setMaxPriorityFeePerGas(feeInEther))
}

export const sendTransaction = async (sender, recipient, value, setLoading) => {
  setLoading(true)
  window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [{
        from: sender,
        to: recipient,
        value: Utils.parseEther(value).toHexString(),
      }]
    })
    .then((txHash) => {
      console.log(txHash)
      setLoading(false)
    })
    .catch((error) => {
      if(error.code === 4001) {
        setLoading(false)
      } else {
        console.error(error)
      }
    })
}

export const parseBigInt = (bigIntValue) => {
  if(!bigIntValue) {
    return
  }

  const balanceInHex = bigIntValue.toHexString()
  const balanceInWei = Web3.utils.hexToNumberString(balanceInHex)
  return Web3.utils.fromWei(balanceInWei, 'ether')
}

export const parseTimeStamp = (timestamp) => {
  if(!timestamp) {
    return
  }
  return dayjs.unix(timestamp).format('DD/MM/YYYY')
}