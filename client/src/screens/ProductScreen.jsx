import { Box, Image, Text, Button, Tooltip, Textarea, Flex, Spinner } from "@chakra-ui/react";
import { getProducts } from "../redux/actions/productActions.js";
import PageNotFound from "../components/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductScreen = () => {
  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product } = products;
  let { id } = useParams();

  // useEffect(() => {
  //   dispatch(getProducts(brand, id));
  // }, []);
  
  return (
    <Box pt="90px">
      {loading ? (
        <Flex w="100%" h="calc(100vh - 90px)" justifyContent="center" alignItems="center">
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
        <Box pt="90px">{products.name}</Box>
      )}
    </Box>
  );
};

export default ProductScreen;
