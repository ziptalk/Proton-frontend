import { OfflineDirectSigner } from '@cosmjs/proto-signing';
import { OfflineAminoSigner } from '@keplr-wallet/types';
import { CONTRACT_INFO } from './CONTRACT_INFO';

const getWalletForChain = async (): Promise<
  OfflineAminoSigner | OfflineDirectSigner
> => {
  const signer = window?.keplr?.getOfflineSigner(CONTRACT_INFO.chain_id);
  if (signer === undefined) {
    throw new Error('Keplr not found');
  }
  return signer;
};

const wallet = await getWalletForChain();

export default wallet;
