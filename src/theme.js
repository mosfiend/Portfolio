import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors : {
    body: "#ffffff",
    heading: "#ffffff",
    p: "#ffffff",
    text: "#ffffff",
  },
  fonts: {
    body: "Quicksand, sans-serif",
    heading: "Quicksand, sans-serif",
    // ...other text styles
  },
});

export default theme;
