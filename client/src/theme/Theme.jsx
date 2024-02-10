import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      red: "red",
      blue: "#0204a8",
    },
  },
  fonts: {
    heading: `"Anek Latin", "sans-serif"`,
    body: `"Roboto", "sans-serif"`,
    select: `"Roboto", "sans-serif"`,
  },
  Button: {
    baseStyle: {
      fontSize: "md",
    },
    buttonRed: {
      _hover: { bg: "black", color:"white" },
      bgColor: "blue.300",
      color: "#f2f2f2",
    },
    buttonBlue: {
      _hover: { bg: "black", color:"white" },
      bgColor: "#c2122f",
      color: "#f2f2f2",
    },
  },
  styles: {
    global: (state) => ({
      hr: {
        borderColor: state.colorMode === "dark" ? "whiteAlpha.900" : "gray.900",
      },
      body: {
        bg: state.colorMode === "dark" ? "black" : "white",
        color: state.colorMode === "dark" ? "whiteAlpha.900" : "blackAlpha.900",
      },
    }),
  },
});

export default theme;
export const buttonRed = theme.Button.buttonRed;
export const buttonBlue = theme.Button.buttonBlue;
