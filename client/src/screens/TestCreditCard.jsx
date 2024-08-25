import { Box, Text, Heading } from "@chakra-ui/react";

const TestCreditCard = () => {
  return (
    <Box pt="120px">
      <Heading as="h2" px="30px" fontSize="20px" mb="20px">
        Use this credit card info to complete the stripe checkout
      </Heading>
      <Text px="30px">CARD NUMBER: 4242 4242 4242 4242</Text>
      <Text px="30px">EXPIRY: Any future date</Text>
      <Text px="30px">CVC: Any three numbers</Text>
    </Box>
  );
};

export default TestCreditCard;
