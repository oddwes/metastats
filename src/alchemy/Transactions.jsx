import { Alchemy, Network } from "alchemy-sdk";

export const getAssetTransfers = async () => {
  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);

  const address = "0x11c5c85Fef5b0e3920C5aA8FA42Ba3A0C4B385a0";

  const res = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    toAddress: address,
    excludeZeroValue: true,
    category: ['external','internal'],
  });

  return res.transfers
}