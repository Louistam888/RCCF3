import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `"Anek Latin", "sans-serif"`,
    body: `"Roboto", "sans-serif"`,
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
      components: {
        Button: {
          baseStyle: {
            border: "1px solid",
            borderColor:
              state.colorMode === "dark" ? "whiteAlpha.800" : "black",
            _hover: state.colorMode === "dark" ? "blue.300" : "red.600",
            bg: "gray.300",
          },
        },
      },
    }),
  },
});

export default theme;
