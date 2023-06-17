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
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const links = [
  { linkName: "Shop", path: "/shop" },
  { linkName: "About", path: "/about" },
  { linkName: "CA", path: "/cart" },
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    p="10px"
    rounded="md"
    color="blackAlpha.900"
    _hover={{ textDecoration: "none", bg: useColorModeValue("gray.300", "whiteAlpha.800") }}
    fontSize="xl"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue("whiteAlpha.900", "gray.300")} px={10} border="1px">
      <Flex h={90} alignItems="center" justifyContent="space-between">
        <HStack>
          {/* NAV BAR LOGO AND SITE NAME */}
          <Link as={ReactLink} to="/">
            <Box display="flex">
              <Flex alignItems="center">
                <Image src="assets/RCCF.png" alt="" boxSize={{ base: "40px", sm: "50px", md: "70px", lg: "80px" }} />
              </Flex>
              <Flex alignItems="center" pl={{ base: "5px", md: "10px" }}>
                <Heading
                  as="h1"
                  display="flex"
                  flexDirection="column"
                  fontSize={{ base: "0.8rem", sm: "0.9rem", md: "1.1rem", lg: "1.8rem" }}
                  lineHeight="1"
                >
                  <span className="h1Red">ROYAL CANADIAN</span>
                  <span className="h1Blue">CHAIR FORCE</span>
                </Heading>
              </Flex>
            </Box>
          </Link>

          {/* NAV BAR MENU BUTTONS FOR EACH PAGE */}
          <HStack display={{ base: "none", md: "block" }} fontSize={{ md: "0.8rem", lg: "1.2rem" }}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName.toUpperCase()}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex justifyContent="flex-end" alignItems="center">
          {/* DARK.LIGHT MODE ICON */}
          <NavLink>
            <Icon
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf="center"
              onClick={() => toggleColorMode()}
            />
          </NavLink>
          <Button
            as={ReactLink}
            to="/login"
            m={{ base: "1px", lg: "5px" }}
            fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1.2rem" }}
            w={{ base: "50px", sm: "65px", md: "100px" }}
            display={{base: "none", sm:"flex"}}
          >
            Sign In
          </Button>
          <Button
            as={ReactLink}
            to="/registration"
            m={{ base: "3px", lg: "5px" }}
            fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1.2rem" }}
            w={{ base: "50px", sm: "65px", md: "100px"}}
            display={{base: "none", sm:"flex"}}
            _hover={{ bg: useColorModeValue("gray.300", "whiteAlpha.800") }}
          >
            Sign Up
          </Button>
          {/* HAMBURGER MENU  */}
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ md: "none" }}
            ml="5px"
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>

      {/* RENDER LINKS IN HAMBURGER MENU ON MOBILE ONLY */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName.toUpperCase()}
              </NavLink>
            ))}
          </Stack>
          <VStack>
            
          <Button
            as={ReactLink}
            to="/login"
            m={{ base: "1px", lg: "5px" }}
            fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1.2rem" }}
            w={{ base: "50px", sm: "65px", md: "100px" }}
            display={{base:"flex", sm:"none"}}
            
          >
            Sign In
          </Button>
          <Button
            as={ReactLink}
            to="/registration"
            m={{ base: "3px", lg: "5px" }}
            fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1.2rem" }}
            w={{ base: "50px", sm: "65px", md: "100px"}}
            display={{base:"flex", sm:"none"}}
            // _hover={{ bg: useColorModeValue("gray.300", "whiteAlpha.800") }}
          >
            Sign Up
          </Button>
          </VStack>
          
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
