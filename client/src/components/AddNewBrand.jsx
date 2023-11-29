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
import { uploadBrand } from "../redux/actions/adminActions.js";
import { convertImage } from "../screens/AdminConsoleScreen.jsx";

const AddNewBrand = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("/assets/RCCF.png");
  const [fileName, setFileName] = useState("");
  const toast = useToast();

  const createNewBrand = () => {
    dispatch(
      uploadBrand({
        name,
        image,
      })
    );
    setName("");
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
      </Box>
      <Text fontSize="sm">New Brand Name</Text>
      <Input
        value={name}
        onChange={(event) => setName(event.target.value.toLowerCase())}
        placeholder="Description"
        mb="10px"
      />
      <Box>
        <VStack>
          <Button
            variant="outline"
            width="160px"
            colorScheme="red"
            onClick={() => createNewBrand()}
          >
            <MdDriveFolderUpload /> <Text ml="2">Save</Text>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddNewBrand;
