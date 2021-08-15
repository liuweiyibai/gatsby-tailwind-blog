import React from "react"
// import { Provider } from 'react-redux';
// import store from './src/store';
import AppLayout from "../src/Layout/AppLayout"

export default ({ element, props }) => {
  return <AppLayout {...props}>{element}</AppLayout>
}
