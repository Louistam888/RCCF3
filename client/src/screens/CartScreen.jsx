import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Wrap,
  Text,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartOrderSummary from "../components/CartOrderSummary";

const CartScreen = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { loading, error, cart } = cartInfo;

  return (
    <Box pt="90px">
      {loading ? (
        <Flex
          w="100%"
          h="calc(100vh - 90px)"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            mt="50px"
            thickness="20px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.600"
            style={{ width: "250px", height: "250px" }}
          />
        </Flex>
      ) : error ? (
        <>
          <PageNotFound error={error} />
        </>
      ) : cart.length <= 0 ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to="/shop">
              Your cart is empty. Shop for a chair!
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing={{ base: "8", md: "16" }}
          >
            <Stack spacing={{ base: "8", md: "10" }} flex="2">
              <Heading fontSize="2xl" fontWeight="extrabold">
                Your Cart
              </Heading>
              <Stack spacing="6">
                {cart.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary />
            </Flex>
            <HStack mt="6" fontWeight="semibold">
              <Text>or</Text>
              <Link
                as={ReactLink}
                to="/shop"
                color={mode("red.600", "blue.500")}
              >
                Continue Shopping
              </Link>
            </HStack>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default CartScreen;
