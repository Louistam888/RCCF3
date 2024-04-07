import { Box, Flex, Text, ButtonGroup, IconButton } from "@chakra-ui/react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
 
  return (
    <Box px={{ base: "5px", sm: "10px" }} mx="100px" mt="20px" mb="30px">
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
          <Text fontWeight="semibold" textAlign={{base:"center", md:"left"}}>Royal Canadian Chair Force</Text>
          <Text>1 Toronto St.</Text>
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
          <IconButton
            as="a"
            href="#"
            aria-label="Instagram"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            icon={<FaInstagram />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="YouTube"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            icon={<FaYoutube />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Facebook"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            icon={<FaFacebook />}
          />
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Footer;
