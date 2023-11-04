import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Alert,
  AlertTitle,
  AlertIcon,
  Wrap,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

const PaymentSuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = () => {
    dispatch(logout());
    toast({
      description: "Successfully logged out",
      status: "success",
      isClosable: true,
    });
    navigate("/shop");
  };
  return (
    <>
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Wrap
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              mt="20px"
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
                  <Button variant="outline" as={ReactLink} to="/yourOrders">
                    Your Orders
                  </Button>
                  <Button variant="outline" as={ReactLink} to="/shop">
                    Keep Shopping
                  </Button>
                  <Button variant="outline" onClick={logoutHandler}>
                    Log out
                  </Button>
                </Stack>
              </Alert>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentSuccessModal;
