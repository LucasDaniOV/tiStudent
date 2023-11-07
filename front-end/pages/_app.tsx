import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import KeycloakLoginRequired from '@/hooks/KeycloakLoginRequired';

export default function App({ Component, pageProps }: AppProps) {
  const isLogin = KeycloakLoginRequired();
  return isLogin ? <Component {...pageProps} /> : <div>Login required</div>;
}
