import {
  Flex,
  Select,
  useColorModeValue as mode,
  Image,
  Box,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/actions/cartActions";

const CheckoutItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();
  return (
    <>
      <Flex>
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Flex
          direction="column"
          align="stretch"
          flex="1"
          mx="2px"
          spacing="4px"
        >
          <Text noOfLines="2" maxWidth="150px">
            <Spacer />
            <Text>
              item: {name}, qty: {qty}{" "}
            </Text>
          </Text>
        </Flex>
        <Box>
          <Text fontWeight="bold">${price}</Text>
        </Box>
      </Flex>
      <Divider bg={mode("gray.400", "gray.800")} />
    </>
  );
};

export default CheckoutItem;
