// function to change quantity. This is declared in the if block to ensure product is loaded
export const changeAmount = (input, amount, setAmount, stock) => {
  if (input === "plus") {
    if (amount < stock) {
      setAmount(amount + 1);
    }
  } else if (input === "minus") {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }
};

//function for adding production qty to cart
export const addItem = (id, qty, brand, dispatch, toast, addCartItem) => {
  dispatch(addCartItem(id, qty, brand));
  toast({
    description: `You have added ${qty} of this product to your cart`,
    status: "success",
    isClosable: true,
  });
};
