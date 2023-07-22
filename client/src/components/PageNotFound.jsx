import { Box, Flex, Image, Heading, Alert, AlertIcon, AlertDescription, AlertTitle, Text } from "@chakra-ui/react";

const PageNotFound = ({ error }) => {
  return (
    <Box position="relative">
      <Box w="100%">
        <Alert status="error" justifyContent="center" display="flex" flexDirection="column">
          <Flex alignItems="center" fontSize={{base:"sm", sm:"lg"}}>
            <AlertIcon my="10px" />
            <AlertTitle>{error}</AlertTitle>
          </Flex>
          <AlertDescription fontSize={{ base: "2xl", sm: "3xl" }} my="10px" lineHeight="30px "textAlign="center">
            Sorry, this page cannot be found.
          </AlertDescription>
        </Alert>
        <Image
          src={`${process.env.PUBLIC_URL}/assets/404.jpg`}
          alt="#"
          w="100%"
          h="500px"
          objectFit="cover"
          objectPosition="70% center"
          // display={{ base: "none", sm: "block" }}
        />
      </Box>
    </Box>
  );
};

export default PageNotFound;
