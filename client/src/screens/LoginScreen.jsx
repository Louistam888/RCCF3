import {
  Button,
  Checkbox,
  FormControl,
  Heading,
  Flex,
  Box,
  TextField,
  useBreakpointvalue,
  useColorModeValue,
  useToast,
  Container,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "from";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as ReactLink, useLocation } from "react-router-dom";

//TODO lengthen password length
const LoginScreen = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.toString()
          .email("Invalid email")
          .required("An email address is required"),
        password: Yup.toString()
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
        ></Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
