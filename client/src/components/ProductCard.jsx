import {
  Flex,
  Box,
  Image,
  Badge,
  Tooltip,
  Stack,
  Link,
  Text,
  useColorModeValue,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react";
import Rating from "./Rating";
import { Link as ReactLink, useParams } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../redux/actions/cartActions";

const ProductCard = ({ product }) => {
  const borderColor = useColorModeValue("gray", "white");
  const borderWidth = useColorModeValue("1px", "2px");

  const { brand } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;

  return (
    <Link
      as={ReactLink}
      to={`/shop/${product.brand}/${product._id}`}
      pt="2"
      cursor="pointer"
      _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
    >
      <Stack
        p="2"
        spacing="3px"
        minW="300px"
        h="550px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.5)"
        rounded="lg"
        position="relative"
        border={`${borderWidth} solid ${borderColor}`}
        _hover={{ boxShadow: "dark-lg" }}
      >
        <Box
          h="20px"
          position={{ base: "relative", sm: "absolute" }}
          top="0"
          left="0"
          m="8px"
          zIndex="2"
        >
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
        <Image
          src={product.image}
          alt={product.name}
          w="100%"
          h="auto"
          objectFit="auto"
          rounded="5px"
          filter={product.stock <= 0 ? "blur(5px)" : "none"}
        />
        <Flex
          m="10px"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            fontSize="xl"
            fontWeight="semiBold"
            as="h3"
            lineHeight="25px"
            width="100%"
            textAlign="center"
          >
            <Text
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                overflow: "hidden",
                height: "50px",
              }}
            >
              {product.name}
            </Text>
          </Box>
          <Box>
            <Rating
              rating={product.rating}
              numReviews={product.numberOfReviews}
            />
          </Box>
          <Flex
            fontSize="2xl"
            mb="3px"
            flexDirection={{ base: "row", sm: "column" }}
          >
            <Text>${Number(product.price).toFixed(2)}</Text>
          </Flex>
        </Flex>
      </Stack>
    </Link>
  );
};

export default ProductCard;
