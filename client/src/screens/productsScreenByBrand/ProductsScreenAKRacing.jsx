import { Center, Grid, Flex, Box, Image, Heading } from "@chakra-ui/react";
import sortByNew from "../../functions/sortByNew";
import products from "../../products";
import ProductCard from "../../components/ProductCard";

const ProductsScreenAKRacing = () => {
  //FUNCTION TO SORT CHAIRS BY NEW STATUS
  const chairArray = sortByNew(products);

  return (
    <Box pt="90px">
      <Flex h={{ base: "180px", md: "250px" }} overflow="hidden" position="relative" mb={{ base: "20px", sm: "50px" }}>
        <Image src="/assets/brandPhotos/brandBanner.jpg" w="100%" />
        <Flex position="absolute" justifyContent="center" alignItems="center" w="100%" h="100%" className="fadeIn">
          <Heading fontSize={{ base: "5xl", sm: "7xl" }} textTransform="uppercase" color="whiteAlpha.900">
            AKRacing
          </Heading>
        </Flex>
      </Flex>
      <Grid
        templateColumns="repeat(auto-fit, minmax(280px, 350px))"
        gap={{ base: "15px", md: "10px", lg: "20px" }}
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
    </Box>
  );
};

export default ProductsScreenAKRacing;
