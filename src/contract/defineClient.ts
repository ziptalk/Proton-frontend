import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { CONTRACT_INFO } from './CONTRACT_INFO';
import wallet from './defineWallet';
import { GasPrice } from '@cosmjs/stargate';

const client = await SigningCosmWasmClient.connectWithSigner(
  CONTRACT_INFO.rpcEndpoint,
  wallet,
  {
    gasPrice: GasPrice.fromString('0.025untrn'), // Set appropriate gas price
  }
);

export default client;
