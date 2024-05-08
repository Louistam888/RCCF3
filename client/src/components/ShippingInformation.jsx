import {
  Box,
  FormControl,
  Flex,
  Heading,
  VStack,
  Stack,
  Text,
  Radio,
  RadioGroup,
  Tooltip,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { useDispatch } from "react-redux";
import { setExpress } from "../redux/actions/cartActions";
import { useState, useEffect } from "react";
import {
  setShippingAddress,
  setShippingAddressError,
} from "../redux/actions/orderActions";

const ShippingInformation = () => {
  //redux
  const dispatch = useDispatch();

  //formik
  const [formStateChanged, setFormStateChanged] = useState(false);

  //get shipping info from fields
  const handleChange = (errors, touched, values) => {
    setTimeout(() => {
      if (
        Object.keys(errors).length === 0 &&
        Object.keys(touched).length >= 3
      ) {
        setErrorState(false, values);
      } else {
        setErrorState(true);
      }
    }, 100);
  };

  const setErrorState = (errorState, data) => {
    //dispatches shipping info if the user has filled in all field with at least two characters (errorState === false),
    if (errorState === false) {
      dispatch(setShippingAddress(data));
    }
    if (
      (!formStateChanged && !errorState) ||
      (formStateChanged && errorState)
    ) {
      return;
    } else {
      setFormStateChanged(errorState);
      dispatch(setShippingAddressError(errorState));
    }
  };

  return (
    <Formik
      initialValues={{
        address: "",
        postalCode: "",
        city: "",
        stateOrProvince: "",
        country: "",
      }}
      validationSchema={Yup.object({
        address: Yup.string()
          .required("This field is required.")
          .min(2, "This address is too short."),
        postalCode: Yup.string()
          .required("This field is required.")
          .min(2, "This postal code is too short."),
        city: Yup.string()
          .required("This field is required.")
          .min(2, "This city name is is too short."),
        stateOrProvince: Yup.string()
          .required("This field is required.")
          .min(2, "State or Province name is is too short."),
        country: Yup.string()
          .required("This field is required.")
          .min(2, "This country name is too short."),
      })}
    >
      {(formik) => (
        <VStack as="form">
          <FormControl
            onChange={handleChange(
              formik.errors,
              formik.touched,
              formik.values
            )}
          >
            <TextField
              name="address"
              placeholder="Street Address"
              label="Street Address"
            />
            <Flex direction={{ base: "column", sm: "row" }}>
              <Box flex="1" mr={{ base: "0", sm: "10" }}>
                <TextField
                  name="postalCode"
                  placeholder="Postal Code"
                  label="Postal Code"
                />
              </Box>
              <Box flex="2">
                <TextField name="city" placeholder="City" label="City" />
              </Box>
            </Flex>
            <Box flex="2">
              <TextField
                name="stateOrProvince"
                placeholder="State or Province"
                label="State or Province"
              />
            </Box>
            <TextField name="country" placeholder="Country" label="Country" />
          </FormControl>
          <Box width="100%" height="180px" pr="5px">
            <Heading fontSize="2xl" fontWeight="extrabold" mb="10px">
              Shipping Method
            </Heading>
            <RadioGroup
              defaultValue="false"
              onChange={(event) => {
                dispatch(setExpress(event));
              }}
            >
              <Stack
                direction={{ base: "column", lg: "row" }}
                align={{ lg: "flex-start" }}
              >
                <Stack pr="10" spacing={{ base: "8px", md: "10px" }} flex="1.5">
                  <Box>
                    <Radio value="true">
                      <Text fontWeight="bold">Express Shipping $14.99</Text>
                      <Text>Shipped within 24 hours</Text>
                    </Radio>
                  </Box>
                </Stack>
                <Radio value="false">
                  <Tooltip label="Free shipping for all orders over $1,000.">
                    <Box>
                      <Text fontWeight="bold">Standard Shipping $4.99</Text>
                      <Text>Shipped within two to three business days</Text>
                      <Text fontStyle="italic">
                        (Free for orders over $1,000)
                      </Text>
                    </Box>
                  </Tooltip>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};

export default ShippingInformation;
