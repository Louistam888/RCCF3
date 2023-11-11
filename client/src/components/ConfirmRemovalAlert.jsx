import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setProductUpdateFlag } from "../redux/slices/products";

const ConfirmRemovalAlert = ({
  isOpen,
  onClose,
  cancelRef,
  itemToDelete,
  deleteAction,
}) => {
  const dispatch = useDispatch();
  const onDeleteItem = () => {
    dispatch(deleteAction(itemToDelete._id));
    dispatch(setProductUpdateFlag()) // dispatches change of redux state flag for product update to true as it is in child component 
    onClose();
  };
  return (
    <AlertDialog
      isOpen={isOpen}
      //cancelRef was set to confirm removal dialog. Least destructive sets cancel and dismiss dialog by pressing enter or space
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {itemToDelete.name}
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? This cannot be undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDeleteItem} ml="3px">
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmRemovalAlert;
