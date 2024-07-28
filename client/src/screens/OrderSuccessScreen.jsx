import {
  Button,
  Alert,
  AlertTitle,
  AlertIcon,
  Wrap,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createOrder, resetOrder } from "../redux/actions/orderActions";
import { resetCart } from "../redux/actions/cartActions";
import { getProducts } from "../redux/actions/productActions";
import { updateProduct } from "../redux/actions/adminActions";
import axios from "axios";

const OrderSuccessScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const cartItems = useSelector((state) => state.cart);
  const { cart } = cartItems;
  const productInfo = useSelector((state) => state.products);
  const { products, loading } = productInfo;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getProducts("adminConsole"));
  }, [dispatch]);

  // Check if payment was successful
  useEffect(() => {
    const fetchLatestSession = async () => {
      try {
        const response = await axios.get(
          "https://rccf3.onrender.com/latestSession"
        );
        const { metadata, payment_method_types, total_details, amount_total } =
          response.data;
        const addressInfo = metadata.addressInfo;
        const paymentMethod = payment_method_types[0];
        const paymentDetails = response.data.total_details;
        const shippingCost = (total_details.amount_shipping / 100).toFixed(2);
        const totalTax = (total_details.amount_tax / 100).toFixed(2);
        const amountTotal = (amount_total / 100).toFixed(2);

        if (response.data.status === "complete") {
          setPaymentSuccess(true);
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

  // Handle payment success and update product stock
  useEffect(() => {
    if (paymentSuccess && !loading && products.length > 0) {
      const updateProducts = async () => {
        try {
          // Create an array of promises for updating products
          const updatePromises = cart
            .map((cartItem) => {
              const matchedProduct = products.find(
                (item) => item._id === cartItem.id
              );

              if (matchedProduct) {
                const updatedStock = matchedProduct.stock - cartItem.qty;
                return dispatch(
                  updateProduct({
                    stock: updatedStock,
                    brand: matchedProduct.brand,
                    name: matchedProduct.name,
                    category: matchedProduct.category,
                    price: matchedProduct.price,
                    id: matchedProduct._id,
                    isNew: matchedProduct.isNew,
                    description: matchedProduct.description,
                    image: matchedProduct.image,
                  })
                );
              }
              return null; // Return null for items not found
            })
            .filter((promise) => promise !== null); // Remove null promises

          // Avoid calling Promise.all if there are no promises
          if (updatePromises.length > 0) {
            // Wait for all update promises to resolve
            await Promise.all(updatePromises);

            // Dispatch reset actions after updating products
            dispatch(resetOrder());
            dispatch(resetCart());
          }
        } catch (error) {
          console.error("Error updating products:", error);
        }
      };

      updateProducts();
    }
  }, [paymentSuccess, loading, products, cart, dispatch]);

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
