// Supports weights 100-800
import '@fontsource/anek-latin/300.css';
import "@fontsource/roboto";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme/Theme";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <main>{/* <Routes></Routes> */}</main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
