import { Box, Flex, Link } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import ProductsScreen from "../screens/ProductsScreen";

const BrandCard = ({ brand }) => {
  return (
    <Box>
      <Link as={ReactLink} to={`/shop/${brand}`}>
        <Box border="2px solid green">{brand}</Box>
      </Link>
    </Box>
  );
};

export default BrandCard;
