import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSHoppingCart } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const fontColorDarkLight = useColorModeValue("blackAlpha.900", "whiteAlpha.900");
  return (
    <Link as={ReactLink} to={`/product${product._id}`} pt="2" cursor="pointer" _hover={{ textDecoration: "none" }}>
      <Stack
        p="2"
        spacing="3px"
        bg="whiteAlpha.900"
        minW="240px"
        h={{ base: "540px", sm: "550px" }}
        boxShadow="2xl"
        rounded="lg"
        position="relative"
        border="1px solid gray"
      >
        <Box h="30px">
          {product.stock <= 0 ? (
            <Badge rounded="5px" px="2" fontSize="xl" colorScheme="red">
              SOLD OUT
            </Badge>
          ) : null}
          {product.isNew ? (
            <Badge rounded="5px" px="2" fontSize="xl" colorScheme="green">
              NEW
            </Badge>
          ) : null}
        </Box>
        <Image src={product.image} alt={product.name} w="100%" h="auto" objectFit="auto" />
        <Flex m="10px" justifyContent="space-between" justifyContent="center">
          <Box
            fontSize="xl"
            fontWeight="semiBold"
            as="h2"
            lineHeight="25px"
            width="100%"
            textAlign="center"
            color="blackAlpha.900"
          >
            {product.name}
          </Box>
        </Flex>
      </Stack>
    </Link>
  );
};

export default ProductCard;
