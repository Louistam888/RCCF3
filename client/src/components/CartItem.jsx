import {
  CloseButton,
  Flex,
  useColorModeValue as mode,
  Image,
  Text,
  Tooltip,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { removeCartItem, updateCartItem } from "../redux/actions/cartActions";

const CartItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();

  //states for handling changes to item Quantity
  const [editQty, setEditQty] = useState(true); // determines if input field is disabled
  const [updateQty, setUpdateQty] = useState(qty); // quantity of item
  const [displayEditBtn, setDisplayEditBtn] = useState("block"); // determines if edit btn is displayed after click
  const [updateQtyBtn, setUpdateQtyBtn] = useState("none"); // determines if save button is displayed after click
  const [isFocused, setIsFocused] = useState(false); // handles whether input placeholder appears when input is selected

  //chakra
  const toast = useToast();

  //focus cursor on input on click for editing qty
  const inputRef = useRef(null);

  //function for editing qty, when edit button is pressed
  const handleQtyClick = () => {
    setEditQty(!editQty);
    setDisplayEditBtn("none");
    setUpdateQtyBtn("block");
    setIsFocused(!isFocused);
  };

  //useEffect for handleQtyClick, set in useEffect to run after isFocused state is set
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus(); // focuses on the input element
      inputRef.current.setSelectionRange(0, 0); // moves cursor to the start of the input box
    }
  }, [isFocused]);

  //function grabs new quantity entered in input box
  const handleInputChange = (event) => {
    const newQtyValue = event.target.value;
    setUpdateQty(newQtyValue);
  };

  //function that resets edit/save box and triggers update cart qty state
  const updateQtyClick = (event) => {
    setDisplayEditBtn("block");
    setUpdateQtyBtn("none");
    setEditQty(!editQty);
    setIsFocused(!isFocused);

    //update state.cart qty for item
    dispatch(updateCartItem(id, updateQty));
    toast({
      description: `Item quantity updated`,
      status: "success",
      isClosable: true,
    });
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
        justifyContent="flex-start"
        alignItems="center"
        textAlign={{ base: "center", sm: "left" }}
      >
        <Image
          rounded="lg"
          width="100px"
          h="100px"
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
        height="100px"
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
            // type="number"
            variant="filled"
            color="black"
            fontWeight="bold"
            width="50px"
            textAlign="center"
            isDisabled={editQty}
            ref={inputRef}
            placeholder={isFocused ? "" : qty}
            _placeholder={{ opacity: 1, color: "inherit" }}
            focusBorderColor="blackAlpha"
            onChange={handleInputChange}
          />
          <Button
            onClick={handleQtyClick}
            display={displayEditBtn}
            mb={{ base: "10px", sm: "0" }}
          >
            Edit
          </Button>
          <Button display={updateQtyBtn} onClick={updateQtyClick}>
            Save
          </Button>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          height="100%"
        >
          <Text mb="10px" textTransform="uppercase" fontWeight="semibold">
            ITEM PRICE
          </Text>
          <Text fontWeight="bold" mb={{ base: "10px", sm: "0" }}>
            ${price}
          </Text>
        </Flex>
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
