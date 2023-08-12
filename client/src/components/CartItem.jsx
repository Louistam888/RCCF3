import {
  CloseButton,
  Flex,
  Select,
  useColorModeValue as mode,
  Image,
  Box,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/actions/cartActions.js";
import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";

const CartItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justifyContent="space-between"
      align="center"
    >
      <Flex
        direction="row"
        spacing="5"
        width="full"
        justifyContent="center"
        alignItems="center"
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
      >
        <Text>Quantity: {qty}</Text>

        {/* <Select
          maxW="64px"
          focusBorderColor={mode("orange.500", "orange.200")}
          value={qty}
          onChange={(e) => {
            dispatch(addCartItem((id, e.target.value)));
          }}
        >
          {stock >= 20
            ? [...Array(20).keys()].map((item) => (
                <option key={item + 1} value={item + 1}>
                  {item + 1}
                </option>
              ))
            : null }
        </Select> */}

        <Text fontWeight="bold">${price}</Text>
        <Tooltip
          label="Remove"
          bg="blue.100"
          border="1px solid black"
          placement="bottom"
          color="black"
          fontSize="2xl"
          rounded="5px"
        >
          <CloseButton />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default CartItem;
