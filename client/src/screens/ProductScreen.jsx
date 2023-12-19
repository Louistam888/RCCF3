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
  Wrap,
  Input,
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
import {
  createProductReview,
  resetProductError,
} from "../redux/actions/productActions";
import { StarIcon } from "@chakra-ui/icons";

const ProductScreen = () => {
  let { brand, id } = useParams();

  //state for add quantity
  const [amount, setAmount] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);

  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product, reviewSend } = products;

  const user = useSelector((state) => state.user);
  const userInfo = user;
 

  //chakra
  const buttonBg = mode("gray.300");
  const hoverColor = mode("blue.300", "red.600");
  const toast = useToast();

  //function to add or subtract qty value
  const changeAmount = (input, amount, setAmount, stock) => {
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

  //function for adding production qty to cart
  const addItem = (id, qty, brand, dispatch, toast, addCartItem) => {
    dispatch(addCartItem(id, qty, brand));
    toast({
      description: `You have added ${qty} of this product to your cart`,
      status: "success",
      isClosable: true,
    });
  };

  useEffect(() => {
    dispatch(getProduct(brand, id));
    if (reviewSend) {
      toast({
        description: "Review saved",
        status: "success",
        isClosable: true,
      });
      dispatch(resetProductError());
      setReviewBoxOpen(false);
    }
  }, [dispatch, brand, id, reviewSend]);

  const hasUserReviewed = () => {
    product.reviews.some((item) => item.user === userInfo.userInfo._id);
  };

  const onSubmit = () => {
    dispatch(
      createProductReview(product._id, userInfo.userInfo._id, comment, rating, title, brand)
    );
  };

  if (product) {
    const { brand, name, image, price, description, stock, reviews } = product;

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
                    bg="green"
                    textTransform="uppercase"
                  >
                    {product.productIsNew ? "new" : null}
                  </Badge>
                </Box>

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
                        onClick={() =>
                          changeAmount("minus", amount, setAmount, stock)
                        }
                      >
                        <MinusIcon />
                      </Button>
                      <Text px="20px">{amount}</Text>
                      <Button
                        isDisabled={amount >= product.stock}
                        bg={buttonBg}
                        _hover={{ bg: hoverColor }}
                        border="2px solid white"
                        onClick={() =>
                          changeAmount("plus", amount, setAmount, stock)
                        }
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
                      onClick={() =>
                        addItem(
                          product._id,
                          amount,
                          brand,
                          dispatch,
                          toast,
                          addCartItem
                        )
                      }
                    >
                      <Text>Add to Cart</Text>
                    </Button>
                  </Box>
                </Flex>

                {/* REVIEW SECTION */}
                <Flex
                  justifyContent="center"
                  direction="column"
                  alignItems="center"
                >
                  {userInfo && (
                    <>
                      <Tooltip
                        label={
                          hasUserReviewed()
                            ? "You already reviewed this product "
                            : ""
                        }
                        fontSize="md"
                      >
                        <Button
                          isDisabled={hasUserReviewed()}
                          w="140px"
                          onClick={() => setReviewBoxOpen(!reviewBoxOpen)}
                        >
                          Write a review
                        </Button>
                      </Tooltip>
                      {reviewBoxOpen && (
                        <Flex
                          border="2px solid black"
                          direction="column"
                          w="100%"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Flex>
                            <Button
                              variant="outline"
                              onClick={() => setRating(1)}
                            >
                              <StarIcon color="orange.500" />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setRating(2)}
                            >
                              <StarIcon
                                color={rating >= 2 ? "orange.500" : "gray.200"}
                              />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setRating(3)}
                            >
                              <StarIcon
                                color={rating >= 3 ? "orange.500" : "gray.200"}
                              />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setRating(4)}
                            >
                              <StarIcon
                                color={rating >= 4 ? "orange.500" : "gray.200"}
                              />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setRating(5)}
                            >
                              <StarIcon
                                color={rating >= 5 ? "orange.500" : "gray.200"}
                              />
                            </Button>
                          </Flex>

                          <Input
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Review title (optional)"
                          />
                          <Flex>
                            <Textarea
                              onChange={(event) =>
                                setComment(event.target.value)
                              }
                              placeholder={`The ${product.name} is...`}
                            />
                          </Flex>
                          <Button w="140px" onClick={() => onSubmit()}>
                            Publish review
                          </Button>
                        </Flex>
                      )}
                    </>
                  )}
                </Flex>
                <Text
                  fontWeight="bold"
                  textTransform="uppercase"
                  textAlign="center"
                  mt="10px"
                >
                  reviews
                </Text>
              </Flex>

              {/* RIGHT DIV */}
              <Box w={{ base: "100%", md: "50%" }}>
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
