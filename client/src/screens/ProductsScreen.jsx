import {
  Center,
  Grid,
  Flex,
  Box,
  Image,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import PageNotFound from "./PageNotFound";
import { getProducts } from "../redux/actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductsScreen = () => {
  const { brand } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const { loading, error, products } = productList;
  // const brands = products.map((product) => product.brand);

  useEffect(() => {
    const lowerCaseBrand = brand.toLowerCase();
    dispatch(getProducts(lowerCaseBrand));
  }, []);

  //FUNCTION TO SORT CHAIRS BY NEW STATUS
  const sortByNew = (products) => {
    const isNew = [];
    const chairArray = [];

    products.forEach((item) => {
      if (item.productIsNew === true) {
        isNew.push(item);
      } else {
        chairArray.push(item);
      }
    });

    chairArray.sort((a, b) => {
      const cleanNameA = a.name.replace(/,/g, "");
      const cleanNameB = b.name.replace(/,/g, "");

      if (cleanNameA > cleanNameB) return 1;
      if (cleanNameA < cleanNameB) return -1;
      return 0;
    });

    isNew.sort((a, b) => {
      const cleanNameA = a.name.replace(/,/g, "");
      const cleanNameB = b.name.replace(/,/g, "");

      if (cleanNameA > cleanNameB) return 1;
      if (cleanNameA < cleanNameB) return -1;
      return 0;
    });

    isNew.forEach((item) => {
      chairArray.unshift(item);
    });

    const finalArray = chairArray;
    return finalArray;
  };
  const chairArray = products ? sortByNew(products) : [];

  return (
    <Box>
      {loading ? (
        <Flex
          w="100%"
          h="calc(100vh - 90px)"
          justifyContent="center"
          alignItems="center"
          pt="90px"
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
        <Box pt="90px">
          <Flex
            h={{ base: "180px", md: "250px" }}
            overflow="hidden"
            position="relative"
            mb={{ base: "20px", sm: "50px" }}
          >
            <Image src="/assets/brandPhotos/brandBanner.jpg" w="100%" />
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
                {brand} {/* Render the brand name dynamically */}
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
      )}
    </Box>
  );
};

export default ProductsScreen;
