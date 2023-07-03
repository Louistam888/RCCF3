import { Box, Flex, Text, useColorModeValue, Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const lineColor = useColorModeValue("black", "white");
  return (
    <Box px={{ base: "5px", sm: "10px" }} ml="30px" mr="30px" mt="60px" mb="30px">
      <hr />
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={{ base: "center", md: "space-between" }}
        my="20px"
      >
        <Flex
          flexDirection="column"
          alignItems={{ base: "center", md: "flex-start" }}
          fontSize={{ base: "15px", sm: "xl" }}
        >
          <Text fontWeight="semibold">Royal Canadian Chair Force</Text>
          <Text>1Toronto St.</Text>
          <Text>416-888-8888</Text>
          <Text>
            <a href="mailto: info@royalcanadianchairforce.com">info@royalcanadianchairforce.com</a>
          </Text>
        </Flex>

        <ButtonGroup
          variant="ghost"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={{ base: "20px", md: "0" }}
        >
          <IconButton as="a" href="#" aria-label="Instagram" icon={<FaInstagram fontSize="50px" />} />
          <IconButton as="a" href="#" aria-label="YouTube" icon={<FaYoutube fontSize="50px" />} />
          <IconButton as="a" href="#" aria-label="Facebook" icon={<FaFacebook fontSize="50px" />} />
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Footer;
