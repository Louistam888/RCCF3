import { Center, Grid, Box } from "@chakra-ui/react";
import sortByNew from "../../functions/sortByNew";
import products from "../../products";
import ProductCard from "../ProductCard";

const ProductsScreenAKRacing = () => {
  //FUNCTION TO SORT CHAIRS BY NEW STATUS
  const chairArray = sortByNew(products);

  return (
    <>
      <Box></Box>
      <Grid
        templateColumns="repeat(auto-fit, minmax(280px, 350px))"
        gap={{ base: "0px", sm: "5px", md: "10px", lg: "15px" }}
        justifyContent="center"
        mx="5.5%"
      >
        {chairArray.map((product) => (
          <Box key={product._id}>
            <Center w="100%" h="550px">
              <ProductCard product={product} />
            </Center>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default ProductsScreenAKRacing;
