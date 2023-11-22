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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BrandTableItem from "./BrandTableItem.jsx";
import AddNewProduct from "./AddNewProduct.jsx";
import { getBrands, resetBrandError } from "../redux/actions/brandActions.js";
import { convertImage } from "../screens/AdminConsoleScreen.jsx";

const BrandsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const brandsList = useSelector((state) => state.brands);
  const products = useSelector((state) => state.products);
  const { brands, brandUpdate} = brandsList;
  const toast = useToast();

  const [sortedBrandsArray, setSortedBrandsArray] = useState([]);

  //sort brands alphabetically to display
  const sortedBrands = (array) => {
    const newArray = [...array];
    return newArray.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  useEffect(() => {
    if (brands.length > 0) {
      setSortedBrandsArray(sortedBrands(brands));
    }
  }, [brands.length]);

  useEffect(() => {
    dispatch(getBrands());
    // dispatch(resetBrandError());
    if (brandUpdate) {
      toast({
        description: "Changes saved",
        status: "success",
        isClosable: true,
      });
    }
  }, [dispatch, toast]);

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
                {/* <AddNewProduct brands={brands} /> */}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <TableContainer>
            <Table variant="simple" size="auto">
              <Thead>
                <Tr>
                  <Th>Brand Image</Th>
                  <Th>Edit Brand Name</Th>
                </Tr>
              </Thead>
              <Tbody border="2px solid red">
                {/* && stops the map from running if products.length === 0 */}
                {sortedBrandsArray &&
                  sortedBrandsArray.length > 0 &&
                  sortedBrandsArray.map((brand, index, sortedBrandsArray) => (
                    <BrandTableItem
                      key={index}
                      brand={brand}
                      sortedBrandsArray={sortedBrandsArray}
                      products={products}
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

export default BrandsTab;
