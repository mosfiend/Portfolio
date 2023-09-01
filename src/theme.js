import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors : {
    body: "#000000",
    heading: "#ffffff",
    p: "#ffffff",
    text: "#ffffff",
  },
  fonts: {
    body: "Quicksand, sans-serif",
    heading: "Quicksand, sans-serif",
    // ...other text styles
  },
  styles: {
    global: (props) => ({
      body: {
        bg:"#000000",
      }
    })
  },
});

export default theme;
