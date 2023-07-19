// Supports weights 100-800
import "@fontsource/anek-latin/300.css";
import "@fontsource/roboto";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme/Theme";

import Navbar from "./components/Navbar";
import LandingScreen from "./screens/LandingScreen";
import Footer from "./components/Footer";
import Shop from "./screens/Shop";
import ProductsScreen from "./screens/ProductsScreen";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingScreen />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/shop/:brand" element={<ProductsScreen />}></Route>        
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
};

export default App;
