import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import Layout from './src/components/Layout';

export const WrapWithLayout = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

// eslint-disable-next-line react/display-name,react/prop-types
export const WrapWithProvider = ({ element }) => {
  return <Provider store={store}>{element}</Provider>;
};
