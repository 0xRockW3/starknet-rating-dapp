import type { AppProps } from 'next/app'
import { InjectedConnector, StarknetConfig } from '@starknet-react/core'

import './global.css'
// import { goerli } from "@starknet-react/chains";

export default function App({ Component, pageProps }: AppProps) {
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' } }),
    new InjectedConnector({ options: { id: 'argentX' } }),
  ]

  return (
    <StarknetConfig autoConnect connectors={connectors}>
      <Component {...pageProps} />
    </StarknetConfig>
  )
}
