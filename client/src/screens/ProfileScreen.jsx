import {
  Box,
  Button,
  FormControl,
  Stack,
  HStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  updateProfile,
  resetUpdateSuccess,
} from "../redux/actions/userActions";
import { useLocation } from "react-router";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation;
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: "Profile saved.",
        status: "success",
        isClosable: true,
      });
      dispatch(resetUpdateSuccess());
    }
  }, [toast, updateSuccess]);

  return userInfo ? (
    <Box pt="90px">
      <Formik
        initialValues={{
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          password: "",
          confirmPassword: "",
        }}
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
            updateProfile(
              userInfo._id,
              values.firstName,
              values.lastName,
              values.email,
              values.password
            )
          );
        }}
      >
        {(formik) => (
          <Box
            minH="100vh"
            maxW={{ base: "3xl", lg: "7xl" }}
            mx="auto"
            px={{ base: "4px", md: "8px", lg: "12px" }}
            py={{ base: "6px", md: "8px", lg: "12px" }}
          >
            <Stack
              direction={{ base: "column", lg: "row" }}
              align={{ lg: "flex-start" }}
            >
              <Stack
                pr={{ base: "0", md: "10px" }}
                flex="1.5"
                mb={{ base: "2xl", md: "none" }}
              >
                <Heading fontSize="2xl" fontWeight="extrabold">
                  Profile
                </Heading>
                <Stack spacing="6px">
                  <Stack spacing="6px" as="form" onSubmit={formik.handleSubmit}>
                    {error && (
                      <Alert
                        status="error"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                      >
                        <AlertIcon />
                        <AlertTitle>We are sorry!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Stack spacing="5px">
                      <FormControl>
                        <TextField
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          label="first name"
                        />
                        <TextField
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          label="last name"
                        />
                        <TextField
                          type="text"
                          name="email"
                          placeholder="email"
                          label="email"
                        />
                        <PasswordTextField
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          label="Password"
                        />
                        <PasswordTextField
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          label="Confirm your password"
                        />
                      </FormControl>
                    </Stack>
                    <Stack spacing="6px">
                      <Button
                        size="lg"
                        fontSize="md"
                        isLoading={loading}
                        type="submit"
                      >
                        Save
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Flex
                direction="column"
                alignItems="center"
                flex="1"
                _dark={{ bg: "gray.900" }}
              >
                <Card>
                  <CardHeader>
                    <Heading size="md">User Report</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4px">
                      <Box pt="2px" fontSize="sm">
                        <Text>
                          Registered on{" "}
                          {new Date(userInfo.createdAt).toDateString()}
                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </Flex>
            </Stack>
          </Box>
        )}
      </Formik>
    </Box>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default ProfileScreen;
