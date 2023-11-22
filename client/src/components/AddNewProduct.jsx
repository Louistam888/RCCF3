import {
  Tr,
  Td,
  Button,
  VStack,
  Textarea,
  Tooltip,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Badge,
  Image,
  Flex,
  Box,
  useToast,
  Select,
} from "@chakra-ui/react";

import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { uploadProduct } from "../redux/actions/adminActions.js";
import { convertImage } from "../screens/AdminConsoleScreen.jsx";

const AddNewProduct = ({ brands }) => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("/assets/RCCF.png");
  const [fileName, setFileName] = useState("");
  const toast = useToast();

  const createNewProduct = () => {
    dispatch(
      uploadProduct({
        brand,
        name,
        category,
        stock,
        price,
        image,
        isNew,
        description,
      })
    );
    setBrand("");
    setName("");
    setCategory("");
    setStock("");
    setPrice("");
    setIsNew(true);
    setDescription("");
    setImage("/assets/RCCF.png");
    setFileName("");
  };

  return (
    <Box>
      <Box>
        <Text fontSize="sm">Upload Image</Text>
        <Tooltip label={"Name of image"} fontSize="sm">
          <Input
            size="sm"
            type="file"
            onChange={(event) => {
              convertImage(event.target, setImage, toast);
            }}
          />
        </Tooltip>
        <Text>{fileName.name}</Text>
        <Image src={image} boxSize="100px" fit="contain" />

        <Text fontSize="sm">Description</Text>
        <Textarea
          value={description}
          w="100%"
          height="120px"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
          size="sm"
        />
      </Box>

      <Box>
        <Text fontSize="sm">Select brand (or create new brand in Brands tab)</Text>
        <Select
          placeholder="Choose one"
          onChange={(event) => setBrand(event.target.value)}
          cursor="pointer"
          fontFamily="sans-serif"
          size="sm"
          textTransform="capitalize"
        >
          {brands
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
        </Select>
        <Text fontSize="sm">Name</Text>
        <Input
          size="sm"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name of product"
        />

        <Text fontSize="sm">Category</Text>
        <Input
          size="sm"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Category"
        />
        <Text fontSize="sm">Price</Text>
        <Input
          size="sm"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Price"
          type="number"
        />
      </Box>

      <Box>
        <Text fontSize="sm">Stock</Text>
        <Input
          size="sm"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
          placeholder="#"
          type="number"
        />

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="isNewFlag" mb="0" fontSize="sm">
            Enable
            <Badge
              rounded="full"
              px="1"
              mx="1"
              fontSize="16px"
              colorScheme="green"
            >
              New
            </Badge>
            badge?
          </FormLabel>
          <Switch
            id="isNewFlag"
            onChange={() => setIsNew(!isNew)}
            isChecked={isNew}
          />
        </FormControl>
      </Box>
      <Box>
        <VStack>
          <Button
            variant="outline"
            width="160px"
            colorScheme="red"
            onClick={() => createNewProduct()}
          >
            <MdDriveFolderUpload /> <Text ml="2">Save</Text>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddNewProduct;
