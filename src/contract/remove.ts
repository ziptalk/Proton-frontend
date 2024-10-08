//담보로 받은 커스텀 토큰의 양만큼이 있어야 봇에서 돈을 빼올 수 있는 기능

import { CONTRACT_ADDRESS, CONTRACT_INFO } from './CONTRACT_INFO';
import client from './defineClient';
import { QVETOKEN_ADDRESS } from '../wallet/CHAIN_INFO';

const address = localStorage.getItem('NEUTRONADDRESS');

const formatAmount = (amount: number, decimalPlaces: number): number => {
  const multiplier = Math.pow(10, decimalPlaces);
  const integerAmount = (amount * multiplier).toFixed(0); // No need to use parseFloat
  return Number(integerAmount);
};

//allowence 받는 함수
const allowence = async (amount: number) => {
  if (!address) return;
  const allowanceMsg = {
    increase_allowance: {
      spender: CONTRACT_ADDRESS, // 컨트랙트 주소
      amount: amount.toString(), // 허용할 토큰 양
      expires: null, // 만료 시간 없음
    },
  };

  try {
    const result = await client.execute(
      address, // 실행자의 주소
      QVETOKEN_ADDRESS, // cw20 토큰 컨트랙트 주소
      allowanceMsg, // 메시지
      'auto', // 가스 수수료 자동 설정
      'memo'
    );
    console.log('Allowance increased:', result);
  } catch (error) {
    console.error('Error increasing allowance:', error);
  }
};

const remove = async (amount: number) => {
  if (!address) return;

  // 3. Define the execute message
  const msg = {
    Remove: {
      amount: amount.toString(),
    },
  };

  // 4. Execute the transaction
  try {
    const result = await client.execute(
      address,
      CONTRACT_ADDRESS,
      msg,
      'auto',
      'memo'
    );
    return result;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
};

export const removeTokens = async (value: number) => {
  const formattedAmount = formatAmount(value, CONTRACT_INFO.decimalPlaces);
  console.log(formattedAmount);
  await allowence(formattedAmount);
  await remove(formattedAmount);
};
