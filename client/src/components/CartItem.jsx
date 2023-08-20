import {
  CloseButton,
  Flex,
  Select,
  useColorModeValue as mode,
  Image,
  Box,
  Text,
  Tooltip,
  Input,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { removeCartItem } from "../redux/actions/cartActions";

const CartItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();

  //handle change quantity
  const [editQty, setEditQty] = useState(true);
  const [updateQtyBtn, setUpdateQtyBtn] = useState("none");
  const [displayQtyBtn, setDisplayQtyBtn] = useState("block");

  //focus cursor on input on click for editing qty
  const inputRef = useRef(null);

  const handleQtyClick = () => {
    setEditQty(!editQty);
    setDisplayQtyBtn("none");
    setUpdateQtyBtn("block");

    inputRef.current.focus(); // Focus the input element
    inputRef.current.selectionStart = 0; //move cursor to input box
  };

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      justifyContent="center"
      align="center"
      border="1px solid black"
    >
      <Flex
        direction={{ base: "column-reverse", sm: "row" }}
        spacing="5"
        width="full"
        justifyContent="center"
        alignItems="center"
        textAlign={{ base: "center", sm: "left" }}
      >
        <Image
          rounded="lg"
          width="120px"
          h="120px"
          fit="cover"
          src={image}
          alt={name}
        />
        <Flex m="0 10px">
          <Text>{name}</Text>
        </Flex>
      </Flex>
      <Flex
        width="full"
        mt={{ base: "5px", md: "0" }}
        align={{ base: "center", md: "baseine" }}
        justifyContent="space-between"
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          height="100%"
        >
          <Text mb="5px" textTransform="uppercase" fontWeight="semibold">
            QUANTITY
          </Text>
          <Input
            variant="filled"
            color="black"
            fontWeight="bold"
            width="50px"
            textAlign="center"
            isDisabled={editQty}
            ref={inputRef}
            value={qty}
          />
          <Button
            onClick={handleQtyClick}
            display={displayQtyBtn}
            mb={{ base: "10px", sm: "0" }}
          >
            Edit
          </Button>
          <Button display={updateQtyBtn}>Save</Button>
        </Flex>
        <Text fontWeight="bold" mb={{ base: "10px", sm: "0" }}>
          ${price}
        </Text>
        <Tooltip
          label="Remove"
          bg="blue.100"
          border="1px solid black"
          placement="bottom"
          color="black"
          fontSize="2xl"
          rounded="5px"
        >
          <CloseButton
            mb={{ base: "10px", sm: "0" }}
            onClick={() => dispatch(removeCartItem(id))}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default CartItem;
