import { Center, Wrap, WrapItem, Flex, Box, Grid } from "@chakra-ui/react";
import products from "../products";

const ProductsScreen = () => {
  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(280px, 350px))"
      gap={{ base: "0px", sm:"5px", md: "10px",lg: "15px"}}
      justifyContent="center"
      mx="5.5%"
    >
      {products.map((product) => (
        <WrapItem key={product._id}>
          <Center w="100%" h="550px" border="2px">
            {product.name}
          </Center>
        </WrapItem>
      ))}
    </Grid>
  );
};

export default ProductsScreen;
