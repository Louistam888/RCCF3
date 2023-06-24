import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FiSHoppingCart } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";

const ProductCard = ({ product }) => {
  return (
    <Stack
      p="2"
      spacing="3px"
      bg={useColorModeValue("white", "gray.800")}
      minW="240px"
      h="450px"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
    >
      {product.isNew && <Circle size="10px" position="absolute" top="2" right="2" bg="green.300" />}
      {product.stock <= 0 && <Circle size="10px" position="absolute" top="2" right="2" bg="red.300" />}

      <Image src={product.image} alt={product.name} rountedTop="lg" />
      <Box flex="1" maxH="5" alignItems="baseline">
        {product.stock <= 0 ? (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
            SOLD OUT
          </Badge>
        ) : null}
        {product.isNew ? (
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
            NEW
          </Badge>
        ) : null}
      </Box>
      <Flex mt="1" justifyContent="space-between" alignContent="center">
        <Link as={ReactLink} to={`/product${product._id}`} pt="2" cursor="pointer">
          <Box fontSize="2xl" fontWeight="semiBold" as="h2" lineHeight="tight">
            {product.name}
          </Box>
        </Link>
      </Flex>
        
    </Stack>
  );
};

export default ProductCard;
