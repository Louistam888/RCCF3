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
import useLogoutHandler from "../customHooks/useLogoutHandler.jsx";

const OrderFailedScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = useLogoutHandler();

  return (
    <Wrap
      justify="center"
      direction="column"
      align="center"
      pt="100px"
      minH="100vh"
    >
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="auto"
      >
        <AlertIcon boxSize="55px" />
        <AlertTitle pt="8px" fontSize="xl">
          Sorry, something went wrong!
        </AlertTitle>
        <Stack mt="20px" minW="200px">
          <Button colorScheme="red" variant="outline" as={ReactLink} to="/cart">
            Return to cart
          </Button>
          <Button colorScheme="red" variant="outline" onClick={logoutHandler}>
            Logout
          </Button>
        </Stack>
      </Alert>
    </Wrap>
  );
};

export default OrderFailedScreen;
