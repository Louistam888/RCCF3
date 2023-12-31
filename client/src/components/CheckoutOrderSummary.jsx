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
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { createOrder, resetOrder } from "../redux/actions/orderActions";
import { resetCart } from "../redux/actions/cartActions";
import { PhoneIcon, EmailIcon, ChatIcon } from "@chakra-ui/icons";
import CheckoutItem from "./CheckoutItem";
import PayPalButton from "./PayPalButton";
import PaymentSuccessModal from "./PaymentSuccessModal";
import PaymentErrorModal from "./PaymentErrorModal";

const CheckoutOrderSummary = () => {
  
  //chakra
  const navigate = useNavigate();
  const toast = useToast();
  const colorMode = mode("gray.600", "gray.400");

  //redux
  const cartItems = useSelector((state) => state.cart);
  const { cart, subtotal, expressShipping } = cartItems;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const shippingInfo = useSelector((state) => state.order);
  const { error, shippingAddress } = shippingInfo;

  //state for disabling payPal button
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

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

  const onPaymentSuccess = async (data) => {
  
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      })
    );

    dispatch(resetOrder());
    dispatch(resetCart());
    navigate("/orderSuccess");
  };

  const onPaymentError = () => {
    
    toast({
      description:
        "Something went wrong during the payment process. Please try again or make sure that your PayPal account balance is enough for this purchase.",
      status: "error",
      duration: "600000",
      isClosable: true,
    });
  };

  //enables paypal button if all fields are changed, and only if there are no errors and as soon as shippingAddress in state.order is modifed with data in all

  useEffect(() => {
    if (error === false && shippingAddress) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress]);

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
        <Button>Back to cart</Button>
      </Stack>
      <PayPalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        buttonDisabled={buttonDisabled}
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
