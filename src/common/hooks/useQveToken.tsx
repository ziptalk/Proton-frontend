import { useEffect, useState } from 'react';
import { getCollateralBalance } from '../../contract/getCollateralBalance';

const useQveToken = () => {
  const [qveTokenBalance, setQveTokenBalance] = useState<number | undefined>(0);

  useEffect(() => {
    getQveToken();
  }, []);

  const getQveToken = async () => {
    const qveToken = await getCollateralBalance();
    setQveTokenBalance(qveToken);
  };

  return qveTokenBalance;
};

export default useQveToken;
