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


