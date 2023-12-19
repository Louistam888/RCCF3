import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  resetErrorAndRemoval,
} from "../redux/actions/adminActions";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert";

const UsersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //used to make ref to dialog box asking user to confirm deletion
  const cancelRef = useRef();
  const [userToDelete, setUserToDelete] = useState("");
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const { error, loading, userRemoval, userList } = admin;
  const { userInfo } = user;


  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(resetErrorAndRemoval());

    if (userRemoval) {
      toast({
        description: "User has been removed",
        status: "success",
        isClosable: true,
      });
    }
  }, [userRemoval, dispatch, toast]);

  const openDeleteConfirmBox = (user) => {
    setUserToDelete(user);
    onOpen();
  };

  return (
    <Box pt="90px">
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justifyContent="center">
          <Stack direction="row" spacing="4px">
            <Spinner
              mt="20px"
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
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Registered</Th>
                  <Th>Admin</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userList &&
                  userList.map((user) => (
                    <Tr key={user._id}>
                      <Td>
                        {user.firstName} {user.lastName}{" "}
                        {userInfo._id ? "(You)" : ""}{" "}
                      </Td>
                      <Td>{user.email}</Td>
                      <Td>{new Date(user.createdAt).toDateString()}</Td>
                      <Td>
                        {user.isAdmin === true ? <CheckCircleIcon /> : null}
                      </Td>
                      <Td>
                        <Button
                          isDisabled={user._id === userInfo._id}
                          variant="outline"
                          onClick={() => openDeleteConfirmBox(user)}
                        >
                          <DeleteIcon mr="5px" /> Delete User 
                        </Button>
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
            itemToDelete={userToDelete}
            itemType={"user"}
          />
        </Box>
      )}
    </Box>
  );
};

export default UsersTab;
