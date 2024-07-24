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
  Button,
  useToast,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { PhoneIcon, EmailIcon, ChatIcon } from "@chakra-ui/icons";
import CheckoutItem from "./CheckoutItem";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const CheckoutOrderSummary = () => {
  //chakra
  const toast = useToast();
  const colorMode = mode("gray.600", "gray.400");

  //redux
  const cartItems = useSelector((state) => state.cart);
  const { cart, subtotal, expressShipping } = cartItems;
  const orderItems = useSelector((state) => state.order);
  const { shippingAddress } = orderItems;

  const shipping = useCallback(() => {
    let shippingCost =
      expressShipping === "true" ? 14.99 : subtotal <= 1000 ? 4.99 : 0;
    return parseFloat(shippingCost);
  }, [expressShipping, subtotal]);

  const hst = useCallback(() => {
    const hstValue = ((Number(subtotal) + Number(shipping())) * 0.13).toFixed(
      2
    );
    return parseFloat(hstValue); // Convert hstValue to a number
  }, [expressShipping, subtotal, shipping]);

  const total = useCallback(
    () =>
      Number(
        shipping() === 0
          ? Number(subtotal) + hst()
          : Number(subtotal) + shipping() + hst()
      ).toFixed(2),
    [shipping, subtotal, hst]
  );

  const makePayment = async () => {

    try {
      const stripePromise = loadStripe(
        "pk_test_51MgFTDE9bJZH5kiQuzUbJHPJ7fmQwSejIxWYh5maW6j8ACwbcLz8dSRvMBP3xYtB8EUIA5qVZDcY9ImbNU4X8qEg00DeApogPl"
      )

      const stripe = await stripePromise;

      const body = {
        products: cart,
        shipping: shipping(),
        expressShipping: expressShipping,
        addressInfo: shippingAddress
      };

      // Make a POST request to your backend to create a checkout session
      const response = await axios.post(
        `/api/stripe/create-checkout-session`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response status is not OK
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      // Extract the session URL from the response data
      const { sessionUrl, sessionId, error } = response.data;

      // Check if there's an error in the response
      if (error) {
        throw new Error(error);
      }

      // Redirect to the checkout page using the retrieved session URL
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      // Check if there's an error in the redirection
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast({
        title: "Payment error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack spacing="8px" rounded="xl" padding="0" width="full">
      <Heading size="md">Order Summary</Heading>
      {cart.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontWeight="medium" color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight="medium" color={colorMode}>
            ${subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
          <Text fontWeight="medium" color={colorMode} textTransform="upperCase">
            hst
          </Text>
          <Text>
            $
            {hst()
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            $
            {total()
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </Flex>
      </Stack>
      <Stack>
        <Button as={ReactLink} to="/cart">
          Back to cart
        </Button>
      </Stack>
      <Stack>
        <Button onClick={makePayment}>Confirm</Button>
      </Stack>

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
