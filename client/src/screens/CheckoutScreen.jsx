import { Box, Stack, Heading, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import CheckoutOrderSummary from "./CheckoutOrderSummary";

const CheckoutScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo ? (
    <Box
      height="100vh"
      maxW={{ base: "3xl", lg: "7x;" }}
      mx="auto"
      px={{ base: "4px", md: "8px", lg: "12px" }}
      pt="90px"
      pb={{ base: "6px", md: "8px", lg: "12px" }}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        alignItems={{ lg: "flex-start" }}
      >
        <Stack
          spacing={{ base: "8px", md: "10px" }}
          flex="1.5"
          mb={{ base: "12px", md: "none" }}
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shipping Information
          </Heading>
          <Stack spacing="6">
            {/* <ShippingInfo /> */}
            <Flex direction="column" align="center" flex="1">
              <CheckoutOrderSummary />
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default CheckoutScreen;
