import {
  Box,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Text,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getProducts,
  resetProductError,
} from "../redux/actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import ProductTableItem from "./ProductTableItem.jsx";
import AddNewProduct from "./AddNewProduct.jsx";
import { getBrands } from "../redux/actions/brandActions.js";

export const convertImage = (uploadedFile, setterFunction, toast) => {
  const file = uploadedFile.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    setterFunction(reader.result);
  };
  reader.onerror = (error) => {
    toast({
      description: `Upload failed ${error}`,
      status: "error",
      isClosable: true,
    });
  };
  reader.readAsDataURL(file);
};

const ProductsTab = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const productInfo = useSelector((state) => state.products);
  const { products, productUpdate } = productInfo;

  const brandList = useSelector((state) => state.brands);
  const { brands } = brandList;

  const toast = useToast();

  //sort brands alphabetically to display 
  const sortedProducts = (array, key) => {
    const newArray = [...array];
    return newArray.sort((a, b) => {
      if (a.brand < b.brand) {
        return -1;
      } else if (a.brand > b.brand) {
        return 1;
      } else {
        return 0;
      }
    });
  };
  const sortedproductsArray = sortedProducts(products)

  useEffect(() => {
    dispatch(getProducts(location.pathname));
    dispatch(resetProductError());
    if (productUpdate) {
      toast({
        description: "Changes saved",
        status: "success",
        isClosable: true,
      });
    }
  }, [dispatch, toast, productUpdate]);

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  return (
    <Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify="center">
          <Stack direction="row" spacing="4">
            <Spinner
              mt="20"
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <Accordion allowToggle={true} border="2px solid black">
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="center">
                  <Box>
                    <Text mr="8px" fontWeight="bold">
                      Add new product
                    </Text>
                  </Box>
                </Box>
              </AccordionButton>
              <AccordionPanel pb="4">
                <AddNewProduct brands={brands} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <TableContainer>
            <Table variant="simple" size="auto">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Description</Th>
                  <Th>Brand & Name</Th>
                  <Th>Category and price</Th>
                  <Th>Stock and new tag</Th>
                </Tr>
              </Thead>
              <Tbody border="2px solid red">
                {/* && stops the map from running if products.length === 0 */}
                {sortedproductsArray &&
                  sortedproductsArray.length > 0 &&
                  sortedproductsArray
                    .map((product) => (
                      <ProductTableItem
                        key={product._id}
                        product={product}
                        brands={brands}
                      />
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default ProductsTab;
