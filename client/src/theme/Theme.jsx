import { extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
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
