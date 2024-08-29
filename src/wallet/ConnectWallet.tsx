// import nuetron_chainInfo from './network_info';

import { Wallet } from './cosmosWallet';
import { ThemeProvider } from '@interchain-ui/react';

const ConnectWallet = () => {
  return (
    <ThemeProvider>
      <Wallet chainName={'neutron'} />
    </ThemeProvider>
  );
};

export default ConnectWallet;
