import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { CONTRACT_INFO } from './CONTRACT_INFO';
import { GasPrice } from '@cosmjs/stargate';
import defineWallet from './defineWallet';

const defineClient = async () => {
  const wallet = await defineWallet();
  const client = await SigningCosmWasmClient.connectWithSigner(
    CONTRACT_INFO.rpcEndpoint,
    wallet,
    {
      gasPrice: GasPrice.fromString('0.025untrn'), // Set appropriate gas price
    }
  );
  return client;
};

export default defineClient;
