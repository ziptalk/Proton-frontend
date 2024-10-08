import { Coin } from '@cosmjs/proto-signing';
import { CONTRACT_ADDRESS, CONTRACT_INFO } from './CONTRACT_INFO';
import defineClient from './defineClient';

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

  const client = await defineClient();
  const formattedAmount = formatAmount(value, CONTRACT_INFO.decimalPlaces);

  // 3. Define the execute message
  const msg = {
    Deposit: {
      amount: formattedAmount.toString(),
    },
  };

  const send_amount: Coin = {
    amount: formattedAmount.toString(),
    denom: 'untrn',
  };
  // 4. Execute the transaction
  try {
    const result = await client.execute(
      address,
      CONTRACT_ADDRESS,
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
