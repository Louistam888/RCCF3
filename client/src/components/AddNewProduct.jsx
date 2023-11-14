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
} from "@chakra-ui/react";

import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { uploadProduct } from "../redux/actions/adminActions.js";
import { convertImage } from "./ProductsTab.jsx";

const AddNewProduct = () => {
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
    setIsNew("");
    setDescription("");
    setImage("");
    setFileName("");
  };

  return (
    <Tr>
      <Td border="2px solid red">
        <Text fontSize="sm">Upload Image</Text>
        <Tooltip label={"Name of image"} fontSize="sm">
          <Input
            size="sm"
            type="file"
            onChange={(event) => {
              convertImage(event.target, setImage);
            }}
          />
        </Tooltip>
        <Text>{fileName.name}</Text>
        <Image src={image} boxSize="100px" fit="contain" />

        <Text fontSize="sm">Description</Text>
        <Textarea
          value={description}
          w="270px"
          height="120px"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
          size="sm"
        />
      </Td>

      <Td border="2px solid blue">
        <Text fontSize="sm">Brand</Text>
        <Input
          size="sm"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          placeholder="Brand of chair"
        />
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
      </Td>

      <Td border="2px solid">
        <Text fontSize="sm">Stock</Text>
        <Input
          size="sm"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
          placeholder="#"
          type="number"
        />
        <Text fontSize="sm">Is New?</Text>
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
      </Td>
      <Td>
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
      </Td>
    </Tr>
  );
};

export default AddNewProduct;
