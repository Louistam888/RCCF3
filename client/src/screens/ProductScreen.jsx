import {
  Box,
  Image,
  Text,
  Button,
  Tooltip,
  Textarea,
  Flex,
  Spinner,
  Heading,
  Badge,
  Icon,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
// import { getProduct } from "../redux/actions/productActions.js";
import PageNotFound from "./PageNotFound";
import Rating from "../components/Rating";
import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductScreen = () => {
  const buttonBorderColor = useColorModeValue("whiteAlpha.800");
  const bgColor = useColorModeValue("gray.300");
  const hoverColor = useColorModeValue("blue.300", "red.600");

  //state for add quantity
  const [amount, setAmount] = useState(1);

  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product } = products;
  let { brand, id } = useParams();

  useEffect(() => {
    dispatch(getProduct(brand, id));
  }, [dispatch, brand, id]);

  // FUNCTION TO CHANGE QUANITTY OF ITEM
  const changeAmount = (input) => {
    if (input === "plus") {
      setAmount(amount + 1);
    } else if (input === "minus") {
      setAmount(amount - 1);
    }
  };

  //FUNCTION TO ADD TO CART

  if (product) {
    const { brand, name, image, price, description } = product;

    return (
      <Box pt="90px">
        {loading ? (
          <Flex
            w="100%"
            h="calc(100vh - 90px)"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner
              mt="50px"
              thickness="20px"
              speed="0.65s"
              emptyColor="gray.200"
              color="red.600"
              style={{ width: "250px", height: "250px" }}
            />
          </Flex>
        ) : error ? (
          <>
            <PageNotFound error={error} />
          </>
        ) : (
          <Flex px={10} w="100%">
            <Flex
              flexDirection={{ base: "column-reverse", md: "row" }}
              justifyContent="center"
              alignItems={{ base: "center", md: "flex-start" }}
              w="100%"
            >
              {/* LEFT DIV */}
              <Flex
                w={{ base: "100%", md: "50%" }}
                flexDirection="column"
                h="100%"
                py="10px"
              >
                <Text
                  as="h2"
                  fontSize={{ base: "2xl", sm: "3xl" }}
                  fontWeight="bold"
                  lineHeight={1}
                  textAlign="center"
                  pb="10px"
                  px="20px"
                  mt="50px"
                >
                  {name}
                </Text>
                <Text fontSize={{ base: "md", sm: "xl" }} textAlign="center">
                  ${price}
                </Text>
                <Flex justifyContent="center">
                  <Rating
                    rating={product.rating}
                    numReviews={product.numberOfReviews}
                  />
                </Flex>
                <Text p="20px">{description}</Text>

                {/* ADD TO CART SECTION */}
                <Flex
                  justifyContent="center"
                  flexDirection="column"
                  mt="30px"
                  px="20px"
                >
                  <Text fontWeight="bold" textTransform="uppercase">
                    Quantity
                  </Text>

                  {/* CHANGE QUANTITY BOX */}
                  <Box w="170px" alignItems="center" display="flex">
                    <Button
                      disabled={amount <= 1}
                      onClick={() => changeAmount("minus")}
                    >
                      <MinusIcon />
                    </Button>
                    <Text px="20px">{amount}</Text>
                    <Button
                      disabled={amount >= product.stock}
                      onClick={() => changeAmount("plus")}
                    >
                      <SmallAddIcon w="20px" h="25px" />
                    </Button>
                  </Box>

                  {/* ADD FUNCTIONALITY */}
                  <Button w="100%">
                    <Text>Add to Cart</Text>
                  </Button>
                  <Button>
                    TESTING
                  </Button>
                </Flex>
              </Flex>

              {/* RIGHT DIV */}
              <Box w={{ base: "100%", md: "50%" }}>
                <Box h="50px" w="100%">
                  {product.stock <= 0 ? (
                    <Badge
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      rounded="5px"
                      px="2"
                      fontSize="xl"
                      color="white"
                      bg="red"
                      h="100%"
                      w="150px"
                      fontSize="2xl"
                    >
                      SOLD OUT
                    </Badge>
                  ) : null}
                  {product.productIsNew ? (
                    <Badge
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      rounded="5px"
                      px="2"
                      fontSize="xl"
                      color="white"
                      bg="green"
                      h="100%"
                      w="100px"
                      fontSize="2xl"
                    >
                      NEW
                    </Badge>
                  ) : null}
                </Box>
                <Image
                  src={image}
                  alt={name}
                  filter={product.stock <= 0 ? "blur(5px)" : "none"}
                />
              </Box>
            </Flex>
          </Flex>
        )}
      </Box>
    );
  }

  // Return null if product.product has not yet been retrieved on page load
  return null;
};

export default ProductScreen;
