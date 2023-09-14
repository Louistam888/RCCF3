import {
  Box,
  Button,
  FormControl,
  Stack,
  HStack,
  Heading,
  Text,
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

  return userInfo ? (
    <Box pt="90px">
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
          <Box></Box>
        )}
      </Formik>
    </Box>
  ) : (
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default ProfileScreen;
