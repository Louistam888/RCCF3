

const useLogoutHandler = () => {
    
  const logoutHandler = () => {
    dispatch(logout());
    toast({
      description: "You have been logged out.",
      status: "success",
      isClosable: true,
    });
    navigate("/products");
  };

  return logoutHandler;
};
