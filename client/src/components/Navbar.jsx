import {
  Box,
  Flex,
  HStack,
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
  Collapse,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const links = [
  { linkName: "Shop", path: "/shop" },
  { linkName: "About", path: "/about" },
  { linkName: "Cart", path: "/cart" },
];

const NavLink = ({ path, linkName }) => {
  return (
    <Link
      as={ReactLink}
      to={path}
      p="10px"
      rounded="md"
      color="blackAlpha.900"
      _hover={{ textDecoration: "none", bg: useColorModeValue("gray.300", "whiteAlpha.800") }}
      fontSize="xl"
      h="40px"
      display="flex"
      alignItems="center"
    >
      {linkName}
    </Link>
  );
};

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("whiteAlpha.900", "gray.300");
  const fontColorDarkLight = useColorModeValue("blackAlpha.900", "whiteAlpha.900");
  const buttonBg = useColorModeValue("gray.300", "blackAlpha.900");
  const hoverColor = useColorModeValue("blue.300", "red.600");
  const isBelowMd = window.innerWidth <= 480;

  return (
    <Box bg={bgColor} px={10} borderBottom={{ base: "1px", md: "2px" }}>
      <Flex h={90} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" w="100%" justifyContent="space-between">
          <HStack>
            {/* NAV BAR LOGO AND SITE NAME */}
            <Link
              as={ReactLink}
              to="/"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
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
                    <Text color="red">ROYAL CANADIAN</Text>
                    <Text color="#0204a8">CHAIR FORCE</Text>
                  </Heading>
                </Flex>
              </Box>
            </Link>
          </HStack>

          {/* NAV BAR MENU BUTTONS FOR EACH PAGE */}
          <HStack display={{ base: "none", md: "block" }} mr={{ base: "0", lg: "5%" }}>
            <Flex>
              {links.map((link) => (
                <NavLink key={link.linkName} path={link.path}>
                  <Text fontSize={{ md: "1rem", lg: "1.2rem" }}>{link.linkName.toUpperCase()}</Text>
                </NavLink>
              ))}
            </Flex>
          </HStack>
        </Flex>

        {/* ICONS FOR SIGN IN/OUT CART AND DARK/LIGHT MODE */}
        <Flex justifyContent="flex-end" alignItems="center">
          {/* DARK/LIGHT MODE ICON */}
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
            bg={buttonBg}
            m={{ base: "3px", lg: "5px" }}
            fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1.2rem" }}
            w={{ base: "50px", sm: "65px", md: "100px" }}
            display={{ base: "none", sm: "flex" }}
            _hover={{ bg: hoverColor }}
          >
            <Text color={fontColorDarkLight}>Sign In</Text>
          </Button>
          <Button
            as={ReactLink}
            to="/registration"
            bg={buttonBg}
            m={{ base: "3px", lg: "5px" }}
            fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1.2rem" }}
            w={{ base: "50px", sm: "65px", md: "100px" }}
            display={{ base: "none", sm: "flex" }}
            _hover={{ bg: hoverColor }}
          >
            <Text color={fontColorDarkLight}> Sign Up</Text>
          </Button>

          {/* HAMBURGER MENU */}
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ md: "none" }}
            ml="5px"
            color={fontColorDarkLight}
            bg={buttonBg}
            onClick={onToggle}
            _hover={{ bg: hoverColor }}
          />
        </Flex>
      </Flex>

      {/* RENDER LINKS IN HAMBURGER MENU ON MOBILE ONLY */}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={0} display="flex" alignItems="center">
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                <Text>{link.linkName.toUpperCase()}</Text>
              </NavLink>
            ))}

            {/* THESE ARE ONLY RENDERED IN HAMBURGER MENU BELOW 480PX VW */}
            {isBelowMd ? (
              <>
                <NavLink>
                  <Text textTransform="uppercase">Sign in</Text>
                </NavLink>
                <NavLink>
                  <Text textTransform="uppercase">Sign Up</Text>
                </NavLink>
              </>
            ) : null}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;
