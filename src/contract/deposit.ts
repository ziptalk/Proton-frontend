import { Coin, OfflineDirectSigner } from '@cosmjs/proto-signing';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import { OfflineAminoSigner } from '@keplr-wallet/types';
import { CONTRANCT_INFO } from '../common/constants/CONTRACTINFO';

// 1. 사용자가 amount 입력 후 minting → 유저의 neutron 을 amount 만큼 봇 주소로 transfer
// 2. 유저의 deposit amount를 컨트랙트에 저장
// 3. amount * 0.8 만큼의 QVE 토큰을 유저의 지갑 주소로 minting

const address = localStorage.getItem('NEUTRONADDRESS');

const formatAmount = (amount: number, decimalPlaces: number): number => {
  const multiplier = Math.pow(10, decimalPlaces);
  const integerAmount = (amount * multiplier).toFixed(0); // No need to use parseFloat
  return Number(integerAmount);
};

export const depositTransfer = async (value: number) => {
  if (!address) return;
  const formattedAmount = formatAmount(value, CONTRANCT_INFO.decimalPlaces);
  const get_wallet_for_chain = async (): Promise<
    OfflineAminoSigner | OfflineDirectSigner
  > => {
    const signer = window?.keplr?.getOfflineSigner(CONTRANCT_INFO.chain_id);
    if (signer === undefined) {
      throw new Error('Keplr not found');
    }
    return signer;
  };
  // 3. Define the execute message
  const msg = {
    Deposit: {
      amount: formattedAmount.toString(),
    },
  };
  const wallet = await get_wallet_for_chain();

  const client = await SigningCosmWasmClient.connectWithSigner(
    CONTRANCT_INFO.rpcEndpoint,
    wallet,
    {
      gasPrice: GasPrice.fromString('0.025untrn'), // Set appropriate gas price
    }
  );

  const send_amount: Coin = {
    amount: formattedAmount.toString(),
    denom: 'untrn',
  };
  // 4. Execute the transaction
  try {
    const result = await client.execute(
      address,
      'neutron1v9xhzye2m8vgqaqjnxc8u4a0sn6m7h4vjsj0ux7zrrgndzytp9ns8uj8q2',
      msg,
      'auto',
      'memo',
      [send_amount]
    );
    return result;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
};
