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
  Box,
  Text,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/actions/adminActions.js";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert.jsx";
import { convertImage } from "../screens/AdminConsoleScreen.jsx";

const ProductTableItem = ({ product, brands }) => {
  const updateProductProp = updateProduct();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState(product.brand);
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [isNew, setIsNew] = useState(product.isNew);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);

  const dispatch = useDispatch();
  const toast = useToast();

  const onSaveProduct = () => {
    dispatch(
      updateProduct(
        brand,
        name,
        category,
        stock,
        price,
        product._id,
        isNew,
        description,
        image,
        toast
      )
    );
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
          <Textarea
            width="270px"
            height="120px"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            size="sm"
          />
        </Td>
        <Td>
          <Flex direction="column" gap="2">
            <Select
              placeholder={brand}
              onChange={(event) => setBrand(event.target.value)}
              cursor="pointer"
              fontFamily="sans-serif"
              size="sm"
              textTransform="capitalize"
            >
              {brands.length > 0 ? (
                brands.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No brands available
                </option>
              )}
            </Select>
            <Input
              size="sm"
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
            />
          </Flex>
        </Td>
        <Td>
          <Flex direction="column" gap="2">
            <Input
              size="sm"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              type="text"
            />
            <Input
              size="sm"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              type="number"
            />
          </Flex>
        </Td>
        <Td>
          <Flex direction="column" gap="4">
            <Input
              size="sm"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
              type="number"
            />
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="isNewFlag" mb="0" fontSize="sm">
                <Badge
                  rounded="full"
                  px="1"
                  mx="1"
                  fontSize="16px"
                  colorScheme="green"
                >
                  New
                </Badge>
              </FormLabel>
              <Switch
                id="isNewFlag"
                onChange={() => setIsNew(!isNew)}
                isChecked={isNew}
              />
            </FormControl>
          </Flex>
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
              Remove Product
            </Button>
            <Button
              colorScheme="orange"
              w="160px"
              variant="outline"
              onClick={onSaveProduct}
            >
              <MdOutlineDataSaverOn style={{ marginRight: "5px" }} />
              Save Changes
            </Button>
          </VStack>
        </Td>
        <Td>
          <ConfirmRemovalAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={product}
            itemType={"product"}
          />
        </Td>
      </Tr>
    </>
  );
};

export default ProductTableItem;
