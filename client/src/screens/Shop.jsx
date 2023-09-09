import { Box, Flex, Heading, Grid, Image, Center } from "@chakra-ui/react";
import BrandCard from "../components/BrandCard";

import { getBrands } from "../redux/actions/brandActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Shop = () => {
  // const allBrands = ["sukida", "akracing", "gtracing", "darkecho"];
  
  const dispatch = useDispatch();
  const brandList = useSelector((state) => state.brands);
  const { loading, error, brands } = brandList;
  
  const allBrands = brands.map((brand)=> brand.name)
  const brandsToDisplay = allBrands.sort();

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  // console.log("here are the brands", brands);

  return (
    <Box pt="90px">
      <Flex
        h={{ base: "180px", md: "250px" }}
        overflow="hidden"
        position="relative"
        mb={{ base: "20px", sm: "50px" }}
      >
        <Image src="/assets/tech.jpg" w="100%" />
        <Flex
          position="absolute"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="100%"
          className="fadeIn"
        >
          <Heading
            fontSize={{ base: "5xl", sm: "7xl" }}
            textTransform="uppercase"
            color="whiteAlpha.900"
          >
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
              <BrandCard brand={brand} />
            </Center>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Shop;
