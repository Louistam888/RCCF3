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
  Image
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
  const [image, setImage] = useState(" data:image/png;base64,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");
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
      <Td>
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
        <Image src={image} boxSize="150px" fit="contain" />
      </Td>
      <Td>
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

      {/* NEED OPTION TO CREATE NEW BRAND  */}
      <Td>
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
      </Td>
      <Td>
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
      <Td>
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
            {" "}
            <MdDriveFolderUpload /> <Text ml="2">Save</Text>
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewProduct;
