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
import { useDispatch, useSelector } from "react-redux";
import BrandTableItem from "./BrandTableItem.jsx";
import { getBrands, resetBrandError } from "../redux/actions/brandActions.js";
import { setBrandUpdateFlag } from "../redux/slices/brands.js";
import AddNewBrand from "./AddNewBrand.jsx";

const BrandsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const brandsList = useSelector((state) => state.brands);
  const products = useSelector((state) => state.products);
  const { brands, brandUpdate } = brandsList;

  const toast = useToast();

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

  let sortedBrandsArray = []

  if (brands) {
    sortedBrandsArray = sortedBrands(brands)
  }

  useEffect(() => {
    dispatch(getBrands());
    dispatch(resetBrandError());
    if (brandUpdate) {
      toast({
        description: "Changes saved",
        status: "success",
        isClosable: true,
      });
    }
  }, [dispatch, toast, brandUpdate]);

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
                      Add New Brand
                    </Text>
                  </Box>
                </Box>
              </AccordionButton>
              <AccordionPanel pb="4">
                <AddNewBrand />
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
                {brands &&
                  brands.length > 0 &&
                  brands.map((brand, index) => (
                    <BrandTableItem
                      key={index}
                      brand={brand}
                      productList={products}
                      setBrandUpdateFlag={setBrandUpdateFlag}
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
