import { Box, Flex, Image, Heading, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const PageNotFound = ({ error }) => {
  return (
    <Box w="100%" position="relative">
      <Alert status="error"  h="100px" justifyContent="center" display="flex" flexDirection="column">
        <AlertIcon />
        <AlertTitle>Sorry, this page cannot be found.</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      <Image
        src={`${process.env.PUBLIC_URL}/assets/404.jpg`}
        alt="#"
        w="100%"
        h="500px"
        objectFit="cover"
        objectPosition="70% center"
        display={{ base: "none", sm: "block" }}
      />
    </Box>
  );
};

export default PageNotFound;
