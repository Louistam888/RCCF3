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
  { linkName: "ShoppingCart", path: "/cart" },
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
                <Image src="assets/RCCF.png" alt="" boxSize={{ base: "50px", sm: "60px", md: "70px", lg: "80px" }} />
              </Flex>
              <Flex alignItems="center" pl={{ base: "5px", md: "10px" }}>
                <Heading
                  as="h1"
                  display="flex"
                  flexDirection="column"
                  fontSize={{ base: "1.05rem", sm: "1.3rem", md: "1.4rem", lg: "1.8rem" }}
                  lineHeight="1"
                >
                  <span className="h1Red">ROYAL CANADIAN</span>
                  <span className="h1Blue">CHAIR FORCE</span>
                </Heading>
              </Flex>
            </Box>
          </Link>

          {/* NAV BAR MENU BUTTONS FOR EACH PAGE */}
          <HStack display={{ base: "none", md: "block" }} ml="20px" fontSize="1.3rem">
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName.toUpperCase()}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems="center">
          {/* DARK.LIGHT MODE ICON */}
          <NavLink>
            <Icon
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf="center"
              onClick={() => toggleColorMode()}
            />
          </NavLink>
          <Button as={ReactLink} to="/login" m="10px" fontSize="1.2rem" variant="link">
            Sign In
          </Button>
          <Button as={ReactLink} to="/registration" m="10px" fontSize="1.2rem" _hover={{ bg: useColorModeValue("gray.300", "whiteAlpha.800") }} border="2px" px="5px" py="5px">
            Sign Up
          </Button>
        </Flex>

        {/* HAMBURGER MENU  */}
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
