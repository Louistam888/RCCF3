import {
  Box,
  Flex,
  Heading,
  Hstack,
  Link,
  Stack,
  useColorModeValue,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Wrap,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const CartScreen = () => {
  return;
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
            <Link as={ReactLink} to="/shop">Your cart is empty. Shop for a chair!</Link>
            </AlertDescription>
      </Alert>
    ) : null}
  </Box>;
};

export default CartScreen;
