import { Box, Image, Text, Button, Tooltip, Textarea, Flex, Spinner } from "@chakra-ui/react";
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
        <Box>TEST</Box>
      )}
    </Box>
  );
};

export default ProductScreen;
