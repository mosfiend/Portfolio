import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, CSSReset, defineStyleConfig, extendTheme } from '@chakra-ui/react';
import theme from "./theme"; // Path to your theme file

ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
      <ChakraProvider theme={theme}>
        {/* <CSSReset/> */}
      <App />
    </ChakraProvider>
    </React.StrictMode>
)

