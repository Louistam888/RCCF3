import { Box, Stack, Heading, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import ShippingInformation from "../components/ShippingInformation";

const CheckoutScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo ? (
    <Flex
      minHeight="100vh"
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4px", md: "8px", lg: "12px" }}
      pt="90px"
      pb={{ base: "6px", md: "8px", lg: "12px" }}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        alignItems={{ lg: "flex-start" }}
        pt="30px"
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
            <ShippingInformation />
            <Flex direction="column" align="center" flex="1">
              <CheckoutOrderSummary />
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default CheckoutScreen;
