//컨트랙트의 유저 담보 토큰을 조회하는 함수

import { QVETOKEN_ADDRESS } from '../wallet/CHAIN_INFO';
import client from './defineClient';

const address = localStorage.getItem('NEUTRONADDRESS');

const formatAmount = (amount: number, decimalPlaces: number): number => {
  const multiplier = Math.pow(10, decimalPlaces);
  const integerAmount = (amount / multiplier).toFixed(2); // No need to use parseFloat
  return Number(integerAmount);
};

export const getCollateralBalance = async () => {
  if (!address) return;

  const msg = {
    balance: {
      address: address,
    },
  };

  //  Execute the transaction
  try {
    const { balance } = await client.queryContractSmart(QVETOKEN_ADDRESS, msg);
    return formatAmount(balance, 6);
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
};
