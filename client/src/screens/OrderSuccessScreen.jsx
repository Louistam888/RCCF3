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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createOrder, resetOrder } from "../redux/actions/orderActions";
import { getProducts } from "../redux/actions/productActions";
import { updateProduct } from "../redux/actions/adminActions";
import { resetCart } from "../redux/actions/cartActions";
import axios from "axios";

const OrderSuccessScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const cartItems = useSelector((state) => state.cart);
  const { cart, brand } = cartItems;
  const productInfo = useSelector((state) => state.products);
  const { products } = productInfo;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const [matchedProducts, setMatchedProducts] = useState([]);

  // check if payment was successful
  useEffect(() => {
    const fetchLatestSession = async () => {
      try {
        const response = await axios.get(
          "https://rccf3.onrender.com/latestSession"
        );
        const addressInfo = response.data.metadata.addressInfo;
        const paymentMethod = response.data.payment_method_types[0];
        const paymentDetails = response.data.total_details;
        const shippingCost = (
          response.data.total_details.amount_shipping / 100
        ).toFixed(2);
        const totalTax = (response.data.total_details.amount_tax / 100).toFixed(
          2
        );
        const amountTotal = (response.data.amount_total / 100).toFixed(2);

        if (response && response.data.status === "complete") {
          onPaymentSuccess(
            addressInfo,
            paymentMethod,
            paymentDetails,
            shippingCost,
            totalTax,
            amountTotal
          );
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

  useEffect(() => {
    dispatch(getProducts("adminConsole"));
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0 && products && products.length > 0) {
      const matched = cart
        .map((cartItem) => {
          return products.find((item) => item._id === cartItem.id);
        })
        .filter((matchedProduct) => matchedProduct !== undefined);
      setMatchedProducts(matched);
    }
  }, [cart, products]);

  const onPaymentSuccess = (
    addressInfo,
    paymentMethod,
    paymentDetails,
    shippingCost,
    totalTax,
    amountTotal
  ) => {
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress: addressInfo,
        paymentMethod: paymentMethod,
        paymentDetails: paymentDetails,
        shippingPrice: shippingCost,
        shippingCost,
        tax: totalTax,
        totalPrice: amountTotal,
        userInfo,
      })
    );

    // find matching product quantity to modify quantity in stock
    if (
      cart.length > 0 &&
      cart !== undefined &&
      matchedProducts &&
      matchedProducts.length > 0
    ) {
      cart.forEach((item, index) => {
        const found = matchedProducts.find((match) => match.id === item._id);
        const updatedStock = found.stock - item.qty;
        dispatch(
          updateProduct({
            stock: updatedStock,
          })
        );
      });
    }
    dispatch(resetOrder());
    // dispatch(resetCart());
  };

  const onPaymentError = () => {
    toast({
      description:
        "Something went wrong during the payment process. Please try again or make sure that your account balance is enough for this purchase.",
      status: "error",
      duration: "600000",
      isClosable: true,
    });
  };

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
            to="/shop"
          >
            Continue Shopping
          </Button>
        </Stack>
      </Alert>
    </Wrap>
  );
};

export default OrderSuccessScreen;
