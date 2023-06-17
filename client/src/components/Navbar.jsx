import {
  Box,
  Flex,
  HStack,
  VStack,
  Heading,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, MoonIcon, sunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue("whiteAlpha.900", "blackAlpha.900")} px={10}>
      <Flex h={90} alignItems="center" justifyContent="space-between" border="2px">
        <HStack>
          <Link as={ReactLink} to="/">
            <Box display="flex">
              <Flex alignItems="center">
                <Image src="assets/RCCF.png" h="80px" w="80px" />
              </Flex>
              <h1>
                <span className="h1Red">ROYAL CANADIAN</span>
                <span className="h1Blue">CHAIR FORCE</span>
              </h1>
            </Box>
          </Link>
        </HStack>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
