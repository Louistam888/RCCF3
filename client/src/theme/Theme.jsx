import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `"Anek Latin", "sans-serif"`,
    body: `"Roboto", "sans-serif"`,
  },
  styles: {
    global: (state) => ({
      main: {
        bg: state.colorMode === "dark" ? "black" : "white",
        color: state.colorMode === "dark" ? "whiteAlpha.900" : "blackAlpha.900",
      },
    }),
  },
});

export default theme;
