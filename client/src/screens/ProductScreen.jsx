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
  useColorModeValue as mode,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
// import { getProduct } from "../redux/actions/productActions.js";
import PageNotFound from "./PageNotFound";
import Rating from "../components/Rating";
import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCartItem } from "../redux/actions/cartActions";

const ProductScreen = () => {
  //state for add quantity
  const [amount, setAmount] = useState(1);

  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product } = products;
  let { brand, id } = useParams();

  //chakra
  const buttonBg = mode("gray.300");
  const hoverColor = mode("blue.300", "red.600");
  const toast = useToast();

  //function for adding production qty to cart
  const addItem = (id, qty) => {
    dispatch(addCartItem(id, qty, brand));
    toast({
      description: `You have added ${qty} of this product to your cart`,
      status: "success",
      isClosable: true,
    });
  };

  useEffect(() => {
    dispatch(getProduct(brand, id));
  }, [dispatch, brand, id]);

  if (product) {
    const { brand, name, image, price, description, stock, reviews } = product;

    // function to change quantity. This is declared in the if block to ensure product is loaded
    const changeAmount = (input) => {
      if (input === "plus") {
        if (amount < stock) {
          setAmount(amount + 1);
        }
      } else if (input === "minus") {
        if (amount > 1) {
          setAmount(amount - 1);
        }
      }
    };

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
                <Box display="flex" justifyContent="center">
                  <Badge
                    rounded="5px"
                    px="2"
                    fontSize="xl"
                    color="white"
                    bg="red"
                  >
                    {stock <= 10 && stock >= 1
                      ? `Only ${stock} left in stock!`
                      : stock === 0
                      ? "Sold Out!"
                      : null}
                  </Badge>
                </Box>

                {/* ADD TO CART SECTION */}
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  mt="10px"
                  p="20px"
                >
                  <Box>
                    <Text
                      fontWeight="bold"
                      textTransform="uppercase"
                      textAlign="center"
                    >
                      Quantity
                    </Text>
                    {/* CHANGE QUANTITY BOX */}
                    <Box w="150px" alignItems="center" display="flex" mt="10px">
                      <Button
                        isDisabled={amount <= 1}
                        bg={buttonBg}
                        border="2px solid white"
                        _hover={{ bg: hoverColor }}
                        onClick={() => changeAmount("minus")}
                      >
                        <MinusIcon />
                      </Button>
                      <Text px="20px">{amount}</Text>
                      <Button
                        isDisabled={amount >= product.stock}
                        bg={buttonBg}
                        _hover={{ bg: hoverColor }}
                        border="2px solid white"
                        onClick={() => changeAmount("plus")}
                      >
                        <SmallAddIcon w="20px" h="25px" />
                      </Button>
                    </Box>

                    {/* ADD TO CART FUNCTIONALITY */}
                    <Button
                      isDisabled={stock === 0}
                      w="150px"
                      bg={buttonBg}
                      _hover={{ bg: hoverColor }}
                      border="2px solid white"
                      mt="5px"
                      onClick={() => addItem(product._id, amount)}
                    >
                      <Text>Add to Cart</Text>
                    </Button>
                  </Box>
                </Flex>
              </Flex>

              {/* RIGHT DIV */}
              <Box w={{ base: "100%", md: "50%" }}>
                <Box h="50px" w="100%">
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
