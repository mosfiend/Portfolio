import { Box, useStyleConfig, extendTheme } from "@chakra-ui/react";
const inputStyle = {
  variants: {
    outline: {
      field: {
        background: "#ffffff33",
        _hover: {
          background: "#ffffff44",
        },
        _placeholder: {
          color: "#555577",
        },
      },
    },
  },
};

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        color: "#ccccdd",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "#ccccdd",
      },
    },
    Heading: {
      baseStyle: {
        color: "#ccccdd",
        fontFamily: "Quicksand, sans-serif",
      },
    },
    Input: inputStyle,
    Glass: {
        baseStyle: {
            bg:"#29b0aa60",
            backdropFilter:"auto",
            backdropBlur:"9px",
            borderRadius:"6px"
      },
    },
    Textarea: {
      variants: {
        outline: {
          background: "#ffffff33",
          color: "#000000",
          _hover: {
            background: "#ffffff44",
          },
          _placeholder: {
            color: "#555577",
          },
        },
      },
    },
    Button: {
      baseStyle: {
      colorScheme:"gray",
        background: "#0cd",
      },
    },
        IconButton: {
            variants: {
                solid: {
                    _hover: {
                        background: "#ff0000",
                        color:"ff0000"
                    },
                },
            },
        },
    },
  fonts: {
    body: "Quicksand, sans-serif",
    heading: "Quicksand, sans-serif",
    // ...other text styles
  },
  styles: {
    global: (props) => ({
      body: {
        bg: "#000000",
      },
    }),
  },
});

export default theme;
