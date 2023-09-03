import { extendTheme } from "@chakra-ui/react";
const inputStyle = {
  variants: {
    outline: {
      field: {
        background: "#ffffff33",
        _hover: {
          background: "#ffffff44",
        },
        _placeholder: {
          color: "#bbbbee",
        },
      },
    },
  },
};

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        color: "#bbbbee",
      },
    },
    Heading: {
      baseStyle: {
        color: "#bbbbee",
        fontFamily: "Quicksand, sans-serif",
      },
    },
    Input: inputStyle,
    Textarea: {
      variants: {
        outline: {
          background: "#ffffff33",
          color: "#000000",
          _hover: {
            background: "#ffffff44",
          },
          _placeholder: {
            color: "#bbbbee",
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
