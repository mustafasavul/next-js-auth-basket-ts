import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'next-auth/client';
import { Provider as ProviderRedux } from 'react-redux';
import '../styles/globals.css';
import store from 'redux/app/store';
import type { AppProps } from 'next/app';
import theme from 'theme';
import Layout from 'components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={(pageProps as any).session}>
      <ChakraProvider theme={theme}>
        <ProviderRedux store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProviderRedux>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
