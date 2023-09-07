import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

const Hamburger = ({ isOpen }) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      
    >
      <Box
        display="block"
        width="20px"
        height="3px"
        backgroundColor="black"
        mx="2px"
        my="1.5px"
        transform={isOpen ? "none" : `translateY(${5.9}px) rotate(${45}deg)`}
        transition=" all 0.2s ease-in-out"
      ></Box>
      <Box
        display="block"
        width="20px"
        height="3px"
        backgroundColor="black"
        mx="2px"
        my="1.5px"
        opacity={isOpen ? 1 : 0}
        transition=" all 0.2s ease-in-out"
      ></Box>
      <Box
        display="block"
        width="20px"
        height="3px"
        backgroundColor="black"
        mx="2px"
        my="1.5px"
        transform={isOpen ? "none" : `translateY(${-5.9}px) rotate(${-45}deg)`}
        transition=" all 0.2s ease-in-out"
      ></Box>
    </Flex>
  );
};

export default Hamburger;
