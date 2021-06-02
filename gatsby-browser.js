import Nprogress from 'nprogress';
import { WrapWithLayout, WrapWithProvider } from './wrap-with';
import './src/styles/public.scss';
import './label.css'

Nprogress.configure({
  showSpinner: false,
});

export const wrapRootElement = WrapWithProvider;
export const wrapPageElement = WrapWithLayout;

export const disableCorePrefetching = () => {
  return true;
};

export const onClientEntry = () => {
  Nprogress.start();
};
export const onPreRouteUpdate = () => {
  Nprogress.start();
};
export const onRouteUpdateDelayed = () => {
  Nprogress.start();
};
export const onRouteUpdate = () => {
  setTimeout(() => {
    Nprogress.done();
  }, 300);
};
