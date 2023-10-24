import {
  Tr,
  Td,
  Button,
  Image,
  VStack,
  Textarea,
  Tooltip,
  Input,
  useToast,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "@react-redux";
import { updateProduct, deleteProduct } from "../redux/actions/adminActions.js";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert.jsx";

const ProductTableItem = ([product]) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [isNew, setIsNew] = useState(product.isNew);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const dispatch = useDispatch();

  const onSaveProduct = () => {
    dispatch(
      updateProduct(
        brand,
        name,
        category,
        stock,
        price,
        product._id,
        productIsNew,
        description,
        image
      )
    );
  };

  const openDeleteConfirmBox = () => {
    onOpen();
  }

  return <div></div>;
};

export default ProductTableItem;
