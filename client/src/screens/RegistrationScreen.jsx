import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useColorMode as mode,
  useToast,
  LightMode,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/actions/userActions";
import PageNotFound from "./PageNotFound";

const RegistrationScreen = () => {
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = "/shop";

  //chakra
  const toast = useToast();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({
        description: "Account successfully created",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Box pt="100px">
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Enter your first name"),
          lastName: Yup.string().required("Enter your last name"),
          email: Yup.string()
            .email("Invalid email")
            .required("An email address is required"),
          password: Yup.string()
            .min(
              1,
              "Password is too short. Please ensure it contains at least 1 character"
            )
            .required("Password is required"),
          confirmPassword: Yup.string()
            .min(
              1,
              "Password is too short. Please ensure it contains at least 1 character"
            )
            .required("Password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        })}
        onSubmit={(values) => {
          dispatch(
            register(
              values.firstName,
              values.lastName,
              values.email,
              values.password
            )
          );
        }}
      >
        {(formik) => (
          <Container
            maxW="lg"
            py={{ base: "12px", md: "24px" }}
            px={{ base: "0px", md: "8px" }}
            minH="4xl"
          >
            <Stack spacing="8px">
              <Stack spacing="6px">
                <Stack spacing={{ base: "2px", md: "3px" }} textAlign="center">
                  <Heading size={{ base: "xs", md: "sm" }}>
                    Create an account
                  </Heading>
                  <HStack spacing="1px" justifyContent="center">
                    <Text color="muted">
                      Already a user?
                      <Button as={ReactLink} to="/login" varaint="link">
                        Sign in
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
                        name="firstName"
                        placeholder="First name"
                        label="First name"
                      />
                      <TextField
                        text="text"
                        name="lastName"
                        placeholder="Last name"
                        label="Last name"
                      />
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
                      <PasswordTextField
                        type="password"
                        name="confirmPassword"
                        placeholder="Comfirm password"
                        label="Confirm password"
                      />
                    </FormControl>
                  </Stack>
                  <Stack>
                    <Stack spacing="6">
                      <LightMode>
                        <Button
                          colorScheme="red"
                          size="lg"
                          fontSize="md"
                          isLoading={loading}
                          type="submit"
                        >
                          Sign up
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

export default RegistrationScreen;
