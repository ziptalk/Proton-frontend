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
    </ThemeProvider>
  );
};

export default CosmosApp;
