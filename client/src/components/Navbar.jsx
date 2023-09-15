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
  useColorModeValue as mode,
  useColorMode,
  Image,
  Collapse,
  useToast,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { MdLocalShipping, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions.js";
import Hamburger from "./Hamburger.jsx";

const links = [
  { linkName: "Shop", path: "/shop" },
  { linkName: "About", path: "/about" },
  { linkName: "Cart", path: "/cart" },
];

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  console.log(isOpen);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = mode("white", "gray.300");
  const fontColorDarkLight = mode("blackAlpha.900", "whiteAlpha.900");
  const buttonBg = mode("gray.300", "blackAlpha.900");
  const hoverColor = mode("blue.300", "red.600");

  //redux
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();

  //chakra
  const toast = useToast();

  const navigate = useNavigate();

  //logout handler function
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    toast({
      description: "Logged out.",
      status: "success",
      isClosable: "true",
    });
  };

  const NavLink = ({ path, children }) => {
    return (
      <Link
        as={ReactLink}
        to={path}
        p="10px"
        rounded="md"
        color="blackAlpha.900"
        _hover={{
          textDecoration: "none",
          bg: mode("gray.300", "whiteAlpha.800"),
        }}
        fontSize="xl"
        h="40px"
        display="flex"
        alignItems="center"
      >
        {children}
      </Link>
    );
  };

  return (
    <Box
      bg={bgColor}
      px="10px"
      borderBottom={{ base: "1px", md: "2px" }}
      position="fixed"
      w="100%"
      zIndex="1000"
    >
      <Flex h="90px" alignItems="center" justifyContent="space-between">
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
                  <Image
                    src={`${process.env.PUBLIC_URL}/assets/RCCF.png`}
                    alt=""
                    boxSize={{
                      base: "40px",
                      sm: "50px",
                      md: "70px",
                      lg: "80px",
                    }}
                  />
                </Flex>
                <Flex alignItems="center" pl={{ base: "5px", md: "10px" }}>
                  <Heading
                    as="h1"
                    display="flex"
                    flexDirection="column"
                    fontSize={{
                      base: "0.8rem",
                      sm: "0.9rem",
                      md: "1.1rem",
                      lg: "1.8rem",
                    }}
                    lineHeight="1"
                  >
                    <span className="rccfRed">ROYAL CANADIAN</span>
                    <span className="rccfBlue">CHAIR FORCE</span>
                  </Heading>
                </Flex>
              </Box>
            </Link>
          </HStack>

          {/* NAV BAR MENU BUTTONS FOR EACH PAGE */}
          <HStack
            display={{ base: "none", md: "block" }}
            mr={{ base: "0", lg: "5%" }}
          >
            <Flex>
              {links.map((link) => (
                <NavLink key={link.linkName} path={link.path}>
                  <Text fontSize={{ md: "1rem", lg: "1.2rem" }}>
                    {link.linkName.toUpperCase()}
                  </Text>
                </NavLink>
              ))}
            </Flex>
          </HStack>
        </Flex>

        {/* ICONS FOR SIGN IN/OUT CART AND DARK/LIGHT MODE */}
        <Flex justifyContent="flex-end" alignItems="center">
          {/* DARK/LIGHT MODE ICON */}
          <Flex
            p="10px"
            _hover={{ bg: hoverColor }}
            justifyContent="center"
            alignItems="center"
            rounded="md"
            cursor="pointer"
            onClick={() => toggleColorMode()}
          >
            <Icon
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf="center"
            />
          </Flex>

          {userInfo ? (
            <>
              <Menu>
                <MenuButton px="4" py="2" transition="all 0.3s" as={Button}>
                  {userInfo.firstName} 
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={ReactLink} to="/profile">
                    <CgProfile />
                    <Text ml="2">Profile</Text>
                  </MenuItem>
                  <MenuItem as={ReactLink} to="/orders">
                    <CgProfile />
                    <Text ml="2">Orders</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>
                    <MdLogout />
                    <Text ml="2">Log Out</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                as={ReactLink}
                to="/login"
                bg={buttonBg}
                _hover={{ bg: hoverColor }}
                m={{ base: "3px", lg: "5px" }}
                fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1.2rem" }}
                w={{ base: "50px", sm: "65px", md: "100px" }}
                display={{ base: "none", sm: "flex" }}
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
            </>
          )}

          {/* HAMBURGER MENU */}
          <IconButton
            size="md"
            icon={<Hamburger isOpen={isOpen} />}
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

      <Collapse in={isOpen} endingHeight="100vh">
        <Box
          pb="4px"
          width="100%"
          height="100%"
          px="-10px"
          display={{ md: "none" }}
          onClick={onToggle}
        >
          <Stack as="nav" spacing="0" display="flex" alignItems="center">
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                <Text>{link.linkName.toUpperCase()}</Text>
              </NavLink>
            ))}

            {/* THESE ARE ONLY RENDERED IN HAMBURGER MENU BELOW 480PX VW */}
            <Box display={{ base: "relative", sm: "none" }}>
              <NavLink path={"/login"}>
                <Text textTransform="uppercase">Sign in</Text>
              </NavLink>
              <NavLink path={"/registration"}>
                <Text textTransform="uppercase">Sign Up</Text>
              </NavLink>
            </Box>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;
