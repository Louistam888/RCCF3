import { Box, Image, Flex, Heading } from "@chakra-ui/react";

const LandingScreen = () => {
  return (
    <Box as="header" position="relative">
      <Image src="assets/mainimage.jpg" alt="#" w="100%" pt="90px" objectFit="auto" rounded="5px" />
      <Flex position="absolute" top="0" left="0" w="100%" h="100%" alignItems="flex-end" justifyContent="center" pb="150px">
        <Heading textTransform="uppercase" color="white" fontSize="8xl">
          <span class="rccfRed">Game</span> at the next level
        </Heading>
      </Flex>
    </Box>
  );
};

export default LandingScreen;
