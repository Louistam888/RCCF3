import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Text,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Spacer,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeReview } from "../redux/actions/adminActions.js";
import {
  getProducts,
  resetProductError,
} from "../redux/actions/productActions.js";

const ReviewsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const productInfo = useSelector((state) => state.products);
  const { products, reviewRemoval } = productInfo;
  console.log("products", products)

  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts("adminConsole"));
    dispatch(resetProductError());
    if (reviewRemoval) {
      toast({
        description: "Review has been removed.",
        status: "success",
        isClosable: true,
      });
    }
  }, [toast, dispatch, reviewRemoval, loading]);

  const onRemoveReview = (productId, reviewId, index) => {
    dispatch(removeReview(productId, reviewId, index));
  };

  return (
    <Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify="center">
          <Stack direction="row" spacing="4">
            <Spinner
              mt="20"
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <Heading fontSize="20px" pb="20px">
            The following products have reviews:
          </Heading>
          {/* {products.length > 0
            ? products.map((product) =>
                product.reviews.length > 0 ? (
                  <Box key={product._id}>
                    <Accordion allowToggle>
                      <AccordionItem>
                        <AccordionButton>
                          <Box flex="1">
                            <Flex>
                              <Text mr="8px" fontWeight="bold">
                                {product.name} : {product.reviews.length}{" "}
                                Reviews
                              </Text>
                            </Flex>
                          </Box>
                        </AccordionButton>
                        <AccordionPanel pb="4px">
                          <TableContainer>
                            <Table size="sm">
                              <Thead>
                                <Tr>
                                  <Th>Username</Th>
                                  <Th>Rating</Th>
                                  <Th>Title</Th>
                                  <Th>Comment</Th>
                                  <Th>Created</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {product.reviews.map((review, index) => (
                                  <Tr key={review._id}>
                                    <Td>{review.name}</Td>
                                    <Td>{review.rating}</Td>
                                    <Td>{review.title}</Td>
                                    <Td>
                                      <Textarea
                                        isDisabled
                                        value={review.comment}
                                        size="sm"
                                      />
                                    </Td>
                                    <Td>
                                      {new Date(
                                        review.createdAt
                                      ).toDateString()}
                                    </Td>
                                    <Td>
                                      <Button
                                        variant="outline"
                                        colorScheme="red"
                                        onClick={() =>
                                          onRemoveReview(
                                            product._id,
                                            review._id,
                                            index
                                          )
                                        }
                                      >
                                        Remove Review
                                      </Button>
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </TableContainer>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                ) : null
              )
            : "No products have reviews"} */}
        </Box>
      )}
    </Box>
  );
};

export default ReviewsTab;
