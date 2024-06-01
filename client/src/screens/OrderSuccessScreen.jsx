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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const OrderSuccessScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

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
