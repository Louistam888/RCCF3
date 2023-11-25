import {
  Tr,
  Td,
  Button,
  Image,
  VStack,
  Textarea,
  Tooltip,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Badge,
  useDisclosure,
  useToast,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { updateBrand, updateProduct } from "../redux/actions/adminActions.js";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert.jsx";
import { convertImage } from "../screens/AdminConsoleScreen.jsx";

const BrandTableItem = ({ brand, products, setBrandUpdateFlag }) => {
  const updateProductProp = updateProduct();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const productsArray = products.products;

  const [brandName, setBrandName] = useState(brand.name);
  const [image, setImage] = useState(brand.image);
  const dispatch = useDispatch();
  const toast = useToast();

  const brandCounter = (array, key, value) => {
    return array.reduce((count, object) => {
      if (object[key] === value) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const numberOfProductsUnderBrand = brandCounter(
    productsArray,
    "brand",
    brandName
  );

  const onSaveBrand = () => {
    dispatch(updateBrand(brandName, brand._id, image, toast));
    dispatch(setBrandUpdateFlag(true));
  };

  const openDeleteConfirmBox = () => {
    onOpen();
  };

  return (
    <>
      <Tr border="2px solid black">
        <Td p="10px">
          <Input
            size="sm"
            type="file"
            onChange={(event) => {
              convertImage(event.target, setImage);
            }}
            w="220px"
          />

          <Image
            src={image}
            boxSize="150px"
            fit="contain"
            border="2px solid black"
          />
        </Td>

        <Td>
          <Flex direction="column" gap="2">
            <Input
              type="text"
              placeholder={brandName}
              value={brandName}
              onChange={(event) => setBrandName(event.target.value)}
            />
          </Flex>
          <Text>Product(s) under this brand: {numberOfProductsUnderBrand}</Text>
        </Td>

        <Td>
          <VStack>
            <Button
              colorScheme="red"
              w="160px"
              variant="outline"
              onClick={openDeleteConfirmBox}
            >
              <DeleteIcon mr="5px" />
              Remove Brand
            </Button>
            <Button
              colorScheme="orange"
              w="160px"
              variant="outline"
              onClick={onSaveBrand}
            >
              <MdOutlineDataSaverOn style={{ marginRight: "5px" }} />
              Save Changes
            </Button>
          </VStack>
        </Td>
        <Td>
          {/* <ConfirmRemovalAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={product}
          /> */}
        </Td>
      </Tr>
    </>
  );
};

export default BrandTableItem;
