import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// Validation schema for Yup, email

const Email = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    comments: Yup.string().required("Comments are required"),
  });

  //function to send data to server for email processing and reset all fields onSubmit
  const handleSubmit = (values, { resetForm }) => {
    // Reset the form after successful submission
    resetForm();
  };
  return (
    <Box p="30px">
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", comments: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="firstName">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.firstName && form.touched.firstName}
              >
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  {...field}
                  id="firstName"
                  placeholder="Enter your first name"
                />
              </FormControl>
            )}
          </Field>

          <Field name="lastName">
            {({ field, form }) => (
              <FormControl
                mt={4}
                isInvalid={form.errors.lastName && form.touched.lastName}
              >
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  {...field}
                  id="lastName"
                  placeholder="Enter your last name"
                />
              </FormControl>
            )}
          </Field>

          <Field name="email">
            {({ field, form }) => (
              <FormControl
                mt={4}
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  {...field}
                  id="email"
                  placeholder="Enter your email address"
                />
              </FormControl>
            )}
          </Field>

          <Field name="comments">
            {({ field, form }) => (
              <FormControl
                mt={4}
                isInvalid={form.errors.comments && form.touched.comments}
              >
                <FormLabel htmlFor="comments">Comments</FormLabel>
                <Textarea
                  {...field}
                  id="comments"
                  placeholder="Enter your comments"
                />
              </FormControl>
            )}
          </Field>

          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default Email;
