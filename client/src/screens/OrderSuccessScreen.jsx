import {
  Button,
  Alert,
  AlertTitle,
  AlertIcon,
  Wrap,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createOrder, resetOrder } from "../redux/actions/orderActions";
import { resetCart } from "../redux/actions/cartActions";
import axios from "axios";

const OrderSuccessScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const cartItems = useSelector((state) => state.cart);
  const { cart } = cartItems;
  const shippingInfo = useSelector((state) => state.order);
  const { error, shippingAddress } = shippingInfo;


  const onPaymentSuccess = (data) => {
    console.log("success")
    // dispatch(
    //   createOrder({
    //     orderItems: cart,
    //     shippingAddress,
    //     // paymentMethod: data.paymentSource,
    //     paymentDetails: data,
    //     shippingPrice: shipping(),
    //     totalPrice: total(),
    //     userInfo,
    //   })
    // );

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

  // check if payment was successful
  useEffect(() => {
    const fetchLatestSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/latestSession");
        
        if (response.data.status === "complete") {
          onPaymentSuccess()
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("No session data available");
        } else {
          console.error("Error fetching latest session:", error);
        }
        onPaymentError();
      }
    };

    fetchLatestSession();
  }, []);

  return (
    <Wrap
      justify="center"
      direction="column"
      align="center"
      pt="100px"
      minH="100vh"
    >
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="auto"
      >
        <AlertIcon boxSize="55px" />
        <AlertTitle pt="8px" fontSize="xl">
          Payment Successful!
        </AlertTitle>
        <Stack mt="20px" minW="200px">
          <Button
            colorScheme="teal"
            variant="outline"
            as={ReactLink}
            to="/your-orders"
          >
            Your Order
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            as={ReactLink}
            to="/shop"
          >
            Products
          </Button>
          <Button colorScheme="teal" variant="outline">
            Logout
          </Button>
        </Stack>
      </Alert>
    </Wrap>
  );
};

export default OrderSuccessScreen;
