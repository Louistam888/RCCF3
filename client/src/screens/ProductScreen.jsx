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
} from "@chakra-ui/react";
// import { getProduct } from "../redux/actions/productActions.js";
import PageNotFound from "./PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductScreen = () => {
  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product } = products;
  let { brand, id } = useParams();

  useEffect(() => {
    dispatch(getProduct(brand, id));
  }, [dispatch, brand, id]);

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
          <Flex px={10} w="100%" border="2px solid yellow" >
            <Flex flexDirection={{base:"column", md:"row"}} border="2px solid red" justifyContent="center" alignItems={{base:"center", md:"flex-start"}} w="100%">
              <Flex w="50%" border="2px solid blue" flexDirection="column">
                <Text as="h2" fontSize="20px">{name}</Text>
                <Text>{price}</Text>
                <Text>{description}</Text>
              </Flex>
              <Box w="50%" border="2px solid green">
                <Image src={image} alt={name} />
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
