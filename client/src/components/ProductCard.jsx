import { Flex, Box, Image, Badge, Tooltip, Stack, Link, Text, useColorModeValue, Button, Icon } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Rating = ({ rating, numReviews }) => {
  const { iconSize, setIconSize } = useState("14px");
  return (
    <Flex>
      <Box spacing="2px">
        <StarIcon color="orange.500" />
        <StarIcon color={rating >= 2 ? "orange.500" : "gray"} />
        <StarIcon color={rating >= 3 ? "orange.500" : "gray"} />
        <StarIcon color={rating >= 4 ? "orange.500" : "gray"} />
        <StarIcon color={rating >= 5 ? "orange.500" : "gray"} />
      </Box>
      <Text ml="3px">{`${numReviews} ${numReviews === 1 ? "Review" : "Reviews"}`}</Text>
    </Flex>
  );
};

const ProductCard = ({ product }) => {
  const borderColor = useColorModeValue("gray", "white");
  const borderWidth = useColorModeValue("1px", "2px");

  return (
    <Link
      as={ReactLink}
      to={`/product/${product._id}`}
      pt="2"
      cursor="pointer"
      _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
    >
      <Stack
        p="2"
        spacing="3px"
        minW="240px"
        h="550px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
        rounded="lg"
        position="relative"
        border={`${borderWidth} solid ${borderColor}`}
        _hover={{ boxShadow: "dark-lg" }}
      >
        <Box h="20px" position={{ base: "relative", sm: "absolute" }} top="0" left="0" m="8px">
          {product.stock <= 0 ? (
            <Badge rounded="5px" px="2" fontSize="xl" color="white" bg="red">
              SOLD OUT
            </Badge>
          ) : null}
          {product.productIsNew ? (
            <Badge rounded="5px" px="2" fontSize="xl" color="white" bg="green">
              NEW
            </Badge>
          ) : null}
        </Box>
        <Image src={product.image} alt={product.name} w="100%" h="auto" objectFit="auto" rounded="5px" />
        <Flex m="10px" justifyContent="center" alignItems="center" flexDirection="column">
          <Box
            fontSize="xl"
            fontWeight="semiBold"
            as="h3"
            lineHeight="25px"
            width="100%"
            textAlign="center"
            minH="50px"
            mb="12px"
          >
            <Text
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {product.name}
            </Text>
          </Box>
          <Box>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </Box>
          <Flex fontSize="2xl" mb="3px" flexDirection={{ base: "row", sm: "column" }}>
            <Text>${Number(product.price).toFixed(2)}</Text>
            <Tooltip
              label="Add to Cart"
              bg="blue.100"
              border="1px solid black"
              placement="bottom"
              color="black"
              fontSize="2xl"
              rounded="5px"
            >
              <Button
                variant="ghost"
                disabled={product.stock <= 0}
                alt="Add item to cart"
                _hover={{ bg: "none", transform: "scale(1.5)" }}
              >
                <Icon
                  as={FiShoppingCart}
                  h={{ base: "23px", sm: "30px" }}
                  w={{ base: "23px", sm: "30px" }}
                  alignSelf="center"
                ></Icon>
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
      </Stack>
    </Link>
  );
};

export default ProductCard;
