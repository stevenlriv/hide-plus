/**
 * @help https://github.com/Shopify/polaris-react/issues/814
 */
import App from 'next/app';
import Head from 'next/head';
import { AppProvider, Page } from '@shopify/polaris';
import {
  Provider as AppBridgeProvider,
  TitleBar,
  Modal,
  Toast,
  ResourcePicker,
  Loading
} from '@shopify/app-bridge-react';
import '@shopify/polaris/styles.css';
import Cookies from 'js-cookie';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  },
});

class MyApp extends App {
  state = {
    shopOrigin: Cookies.get('shopOrigin'),
    apiKey: API_KEY
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Hide Plus</title>
          <meta charSet="utf-8" />
        </Head>
          <AppProvider>
            <AppBridgeProvider shopOrigin={this.state.shopOrigin} apiKey={this.state.apiKey}>
              <ApolloProvider client={client}>
                <Component {...pageProps} />
              </ApolloProvider>
            </AppBridgeProvider>
          </AppProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;
