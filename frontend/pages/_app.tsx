import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'viem/chains' 
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [infuraProvider({ apiKey: '4458cf4d1689497b9a38b1d6bbf05e78' })],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new MetaMaskConnector({
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true
      }
    })
  ]
})

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        bg: "#282339"
      }
    })
  }
})
const themeMUI = createTheme({});
const themes = deepmerge(theme, themeMUI)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider theme={themes}>
        <WagmiConfig config={config}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default MyApp
