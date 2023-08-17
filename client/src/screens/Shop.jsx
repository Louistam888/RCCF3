import { Box, Flex, Heading, Grid, Image, Center } from "@chakra-ui/react";
import BrandCard from "../components/BrandCard";

const Shop = () => {
  // FUNCTION TAKES ALL BRANDS, REMOVES DUPLICATES AND ALPHABETIZES

  const allBrands = ["sukida", "akracing", "gtracing", "darkecho"];
  const brandsToDisplay = allBrands.sort();

  return (
    <Box pt="90px">
      <Flex h={{ base: "180px", md: "250px" }} overflow="hidden" position="relative" mb={{ base: "20px", sm: "50px" }}>
        <Image src="/assets/tech.jpg" w="100%" />
        <Flex position="absolute" justifyContent="center" alignItems="center" w="100%" h="100%" className="fadeIn">
          <Heading fontSize={{ base: "5xl", sm: "7xl" }} textTransform="uppercase" color="whiteAlpha.900">
            our brands
          </Heading>
        </Flex>
      </Flex>
      <Grid
        templateColumns="repeat(auto-fit, minmax(280px, 350px))"
        gap={{ base: "15px", md: "10px", lg: "20px" }}
        justifyContent="center"
        mx="5.5%"
      >
        {brandsToDisplay.map((brand, index) => (
          <Box key={index}>
            <Center w="100%" h="550px">
              <BrandCard brand={brand}/>
            </Center>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Shop;
