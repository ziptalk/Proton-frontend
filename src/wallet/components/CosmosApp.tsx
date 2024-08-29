import { ChainProvider } from '@cosmos-kit/react';
import { wallets } from 'cosmos-kit';
import assets from 'chain-registry/assets';
import { chains } from 'chain-registry';
import {
  Box,
  Container,
  ThemeProvider,
  useColorModeValue,
  useTheme,
} from '@interchain-ui/react';
import '@interchain-ui/react/styles';
import { useState } from 'react';
import { CHAIN_NAME } from '../config';
import { Wallet } from '../cosmosWallet';

const CosmosApp = () => {
  const { themeClass } = useTheme();
  const [chainName, setChainName] = useState(CHAIN_NAME);

  function onChainChange(chainName?: string) {
    setChainName(chainName!);
  }

  return (
    <ThemeProvider>
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
        <Box
          className={themeClass}
          minWidth='100dvh'
          minHeight='100dvh'
          backgroundColor={useColorModeValue('$white', '$background')}
        >
          <Container maxWidth='64rem' attributes={{ py: '$14' }}>
            <Wallet chainName={chainName} onChainChange={onChainChange} />
          </Container>
        </Box>
      </ChainProvider>
    </ThemeProvider>
  );
};

export default CosmosApp;
