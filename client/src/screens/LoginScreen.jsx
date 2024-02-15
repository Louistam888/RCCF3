import {
  Button,
  Checkbox,
  FormControl,
  Heading,
  Flex,
  Box,
  Text,
  useBreakpointvalue,
  useColorModeValue as mode,
  useToast,
  Container,
  Stack,
  HStack,
  LightMode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link as ReactLink, useLocation } from "react-router-dom";
import PasswordTextField from "../components/PasswordTextField";
import TextField from "../components/TextField";
import PageNotFound from "./PageNotFound";


//redux
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";

//TODO lengthen password length
const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = "/shop";
  const toast = useToast();

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  const hoverColor = mode("red.600", "blue.300");

  //Upon login, send user back to the previous page if known. Otherwise send the to the shop
  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({
        description: "Login successful",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, location.state, toast]);

  return (
    <Box pt="90px">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email")
            .required("An email address is required"),
          password: Yup.string()
            .min(
              1,
              "Password is too short. Please ensure it contains at least 1 character"
            )
            .required("Password is required"),
        })}
        onSubmit={(values) => {
          dispatch(login(values.email, values.password));
        }}
      >
        {(formik) => (
          <Container
            maxW="lg"
            py={{ base: "12", md: "24" }}
            px={{ base: "0", md: "8" }}
            minH="4xl"
          >
            <Stack spacing="8">
              <Stack spacing="6">
                <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                  <Heading size={{ base: "xs", md: "sm" }}>
                    Log in to your account
                  </Heading>
                  <HStack spacing="1" justifyContent="center">
                    <Text color="muted">
                      Don't have an account?
                      <Button as={ReactLink} to="/registration" varaint="link">
                        Sign up
                      </Button>
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
              <Box
                py={{ base: "0", md: "8" }}
                px={{ base: "4", md: "10" }}
                bg={{ base: "transparent", md: "bg-surface" }}
                boxShadow={{ base: "none", md: "xl" }}
              >
                <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                  {error && (
                    <>
                      <PageNotFound error={error} />
                    </>
                  )}
                  <Stack spacing="5">
                    <FormControl>
                      <TextField
                        text="text"
                        name="email"
                        placeholder="email@email.com"
                        label="email"
                      />
                      <PasswordTextField
                        type="password"
                        name="password"
                        placeholder="your password"
                        label="password"
                      />
                    </FormControl>
                  </Stack>
                  <Stack>
                    <Stack spacing="6">
                      <LightMode>
                        <Button
                          colorScheme="red"
                          _hover={{ bg: hoverColor }}
                          size="lg"
                          fontSize="md"
                          isLoading={loading}
                          type="submit"
                        >
                          Sign in
                        </Button>
                      </LightMode>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Container>
        )}
      </Formik>
    </Box>
  );
};

export default LoginScreen;
