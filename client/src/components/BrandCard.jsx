import { Box, Flex, Link, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import ProductsScreen from "../screens/ProductsScreen";

const BrandCard = ({ brand }) => {
  return (
    <Box>
      <Link as={ReactLink} to={`/shop/${brand}`} >
        <Heading border="2px solid green" textTransform="capitalize">{brand}</Heading>
      </Link>
    </Box>
  );
};

export default BrandCard;
