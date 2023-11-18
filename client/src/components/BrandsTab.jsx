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
import { convertImage } from "../screens/AdminConsoleScreen.jsx";

const BrandsTab = () => {
  return <div></div>;
};

export default BrandsTab;
