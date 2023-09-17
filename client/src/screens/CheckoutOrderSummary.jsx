import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../redux/actions/orderActions";
import { PhoneIcon, EmailIcon, ChatIcon } from "@chakra-ui/icons";
import CheckoutItem from "../components/CheckoutItem";

const CheckoutOrderSummary = () => {
  const colorMode = mode("gray.600", "gray.400");

  //redux
  const cartItems = useSelector((state) => state.cart);
  const { cart, subtotal, expressShipping } = cartItems;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const shippingInfo = useSelector((state) => state.order);
  const { order, shippingAddress } = cartItems;

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const shipping = useCallback(
    () => (expressShipping === "true" ? 14.99 : subtotal <= 1000 ? 4.99 : 0),
    [expressShipping, subtotal]
  );

  const total = useCallback(
    () =>
      Number(
        shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()
      ).toFixed(2),
    [shipping, subtotal]
  );

  const onPaymentSuccess = () => {
    alert("order success");
  };

  const onPaymentError = () => {
    alert("order error");
  };

  return (
    <Stack spacing="8px" rounded="xl" padding="0" width="full">
      <Heading size="md">OrderSummary</Heading>
      {cart.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
    </Stack>
  );
};

export default CheckoutOrderSummary;
