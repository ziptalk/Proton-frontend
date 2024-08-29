import globalStyles from './common/styles/globalStyles';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from './common/styles/theme';
import { RouterProvider } from 'react-router-dom';
import router from './common/Router';

import { ChainProvider } from '@cosmos-kit/react';
import { wallets } from 'cosmos-kit';
import assets from 'chain-registry/assets';
import { chains } from 'chain-registry';
import '@interchain-ui/react/styles';

function App() {
  return (
    <ChainProvider
      chains={chains}
      assetLists={assets}
      wallets={wallets.keplr}
      walletConnectOptions={{
        signClient: {
          projectId: 'a8510432ebb71e6948cfd6cde54b70f7',
          relayUrl: 'wss://relay.walletconnect.org',
          metadata: {
            name: 'Cosmos Kit dApp',
            description: 'Cosmos Kit dApp built by Create Cosmos App',
            url: 'https://docs.cosmology.zone/cosmos-kit/',
            icons: [],
          },
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ChainProvider>
  );
}

export default App;
