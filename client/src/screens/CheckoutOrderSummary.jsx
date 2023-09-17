import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Divider,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { createOrder } from "../redux/actions/orderActions";
import { PhoneIcon, EmailIcon, ChatIcon } from "@chakra-ui/icons";
import CheckoutItem from "../components/CheckoutItem";
import PayPalButton from "../components/PayPalButton";

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
      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            {subtotal}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            Shipping
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            {shipping() === 0 ? (
              <Badge
                rounded="full"
                px="2px"
                fontSize="15px"
                colorScheme="green"
              >
                Free
              </Badge>
            ) : (
              `$${shipping()}`
            )}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            ${Number(total())}
          </Text>
        </Flex>
      </Stack>
      <PayPalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
      <Box alignItems="center">
        <Text fontSize="sm">Questions or need help?</Text>
        <Flex justifyContent="center">
          <Flex align="center">
            <ChatIcon />
            <Text m="2px">Live Chat</Text>
          </Flex>
          <Flex align="center">
            <PhoneIcon />
            <Text m="2px">Call us</Text>
          </Flex>
          <Flex align="center">
            <EmailIcon />
            <Text m="2px">Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode("gray.400", "gray.300")} />
      <Flex justifyContent="center" my="6px" fontWeight="semibold">
        <Text>or</Text>
        <Link as={ReactLink} to="/products" ml="1px">
          Continue Shopping
        </Link>
      </Flex>
    </Stack>
  );
};

export default CheckoutOrderSummary;
