import { Box, Flex, Heading, Grid, Image, Center } from "@chakra-ui/react";
import BrandCard from "../components/BrandCard";

import { getBrands } from "../redux/actions/brandActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Shop = () => {
  const dispatch = useDispatch();
  const brandList = useSelector((state) => state.brands);
  const { loading, error, brands } = brandList;

  const brandsToDisplay = [...brands].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  useEffect(() => {
    dispatch(getBrands());
  }, []);

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
        templateColumns="repeat(auto-fit, minmax(280px, 300px))"
        gap={{ base: "5px", md: "10px", lg: "15px" }}
        justifyContent="center"
        mx="5.5%"
      >
        {brandsToDisplay.map((brandItem, index) => (
          <Box key={index}>
            <Center w="100%" h="260px">
              <BrandCard brandItem={brandItem} />
            </Center>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Shop;
