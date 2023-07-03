import { Flex, Box, Image, Badge, Tooltip, Stack, Link, Text, useColorModeValue, Button, Icon } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";

const ProductCard = ({ product }) => {
  const borderColor = useColorModeValue("gray", "white");
  const borderWidth = useColorModeValue("1px", "2px");

  return (
    <Link
      as={ReactLink}
      to={`/product${product._id}`}
      pt="2"
      cursor="pointer"
      _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
    >
      <Stack
        p="2"
        spacing="3px"
        minW="240px"
        h={{ base: "540px", sm: "550px" }}
        boxShadow="2xl"
        rounded="lg"
        position="relative"
        border={`${borderWidth} solid ${borderColor}`}
        _hover={{ boxShadow: "dark-lg" }}
      >
        <Box h="30px" mb="5px">
          {product.stock <= 0 ? (
            <Badge rounded="5px" px="2" fontSize="xl" color="white" bg="red">
              SOLD OUT
            </Badge>
          ) : null}
          {product.isNew ? (
            <Badge rounded="5px" px="2" fontSize="xl" color="white" bg="green">
              NEW
            </Badge>
          ) : null}
        </Box>
        <Image src={product.image} alt={product.name} w="100%" h="auto" objectFit="auto" rounded="5px" />
        <Flex
          m="10px"
          justifyContent="space-between"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box fontSize="xl" fontWeight="semiBold" as="h2" lineHeight="25px" width="100%" textAlign="center">
            <Text>{product.name}</Text>
          </Box>
          <Box>
            <Text>${product.price.toFixed(2)}</Text>
          </Box>
          <Tooltip label="Add to Cart" bg="white" placement="top" color="gray.800" fontSize="2xl">
            <Button variant="ghost" display="flex" disabled={product.stock <= 0}>
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf="center"></Icon>
            </Button>
          </Tooltip>
        </Flex>
      </Stack>
    </Link>
  );
};

export default ProductCard;
