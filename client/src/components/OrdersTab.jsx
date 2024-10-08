import {
  Box,
  TableContainer,
  useDisclosure,
  useToast,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  Text,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { TbTruckDelivery } from "react-icons/tb";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert.jsx";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  deleteOrder,
  setDelivered,
  resetErrorAndRemoval,
} from "../redux/actions/adminActions.js";

const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [orderToDelete, setOrderToDelete] = useState("");
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading, orders, deliveredFlag, orderRemoval } = admin;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorAndRemoval());
    if (orderRemoval) {
      toast({
        description: "Order has been removed.",
        status: "success",
        isClosable: true,
      });
    }
    if (deliveredFlag) {
      toast({
        description: "Order has been set to delivered.",
        status: "success",
        isClosable: true,
      });
    }
  }, [orderRemoval, dispatch, toast, deliveredFlag]);

  //sort so latest orders appear first
  const orderCopy = orders ? [...orders] : [];
  const orderReversed = orderCopy.reverse();

  const openDeleteConfirmBox = (order) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivered(order._id));
  };

  return (
    <Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Opps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify="center">
          <Stack direction="row" spacing="4">
            <Spinner
              mt="20"
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Shipping Info</Th>
                  <Th>Items Ordered</Th>
                  <Th>Payment method</Th>
                  <Th>Shipping Price</Th>
                  <Th>Total</Th>
                  <Th>Delivered</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orderReversed.map((order) => (
                    <Tr key={order._id}>
                      <Td>{new Date(order.createdAt).toDateString()}</Td>
                      <Td>
                        {order.firstName} {order.lastName}
                      </Td>
                      <Td>{order.email}</Td>
                      <Td>
                        <Text>{order.shippingAddress.address}</Text>
                        <Text>{order.shippingAddress.city}</Text>
                        <Text>{order.shippingAddress.stateOrProvince}</Text>
                        <Text>{order.shippingAddress.postalCode}</Text>
                        <Text>{order.shippingAddress.country}</Text>
                      </Td>
                      <Td>
                        {order.orderItems.map((item) => (
                          <Text key={item._id}>
                            {item.qty} x {item.name}
                          </Text>
                        ))}
                      </Td>
                      <Td>{order.paymentMethod}</Td>
                      <Td>${order.shippingPrice}</Td>
                      <Td>${order.totalPrice}</Td>
                      <Td>
                        {order.isDelivered ? <CheckCircleIcon /> : "Pending"}
                      </Td>
                      <Td>
                        <Flex direction="column">
                          <Button
                            variant="outline"
                            onClick={() => openDeleteConfirmBox(order)}
                          >
                            <DeleteIcon mr="5px" />
                            Remove Order
                          </Button>
                          {!order.isDelivered && (
                            <Button
                              mt="4px"
                              variant="outline"
                              onClick={() => onSetToDelivered(order)}
                            >
                              <TbTruckDelivery />
                              <Text ml="5px">Delivered</Text>
                            </Button>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ConfirmRemovalAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={orderToDelete}
            itemType={"order"}
            deleteAction={deleteOrder}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersTab;
