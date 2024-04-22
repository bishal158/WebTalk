import * as yup from "yup";

const emailRegex =
  /^([a-zA-Z0-9_\\.\\-]+)@([a-zA-Z0-9\-\\.]+)\.([a-zA-Z]{2,4})$/;
export const loginFormValidation = yup.object({
  email: yup
    .string()
    .required("Please enter a valid email address")
    .matches(emailRegex, "Your email format is invalid"),
  password: yup
    .string()
    .min(6, "Minimum length is 6")
    .required("Please enter password"),
});

export const registerFormValidation = yup.object({
  name: yup
    .string()
    .min(6, "Minimum 6 characters")
    .max(20, "Maximum 20 characters")
    .required("Please enter a name"),

  email: yup
    .string()
    .required("Please enter a valid email address")
    .matches(emailRegex, "Your email format is invalid"),
  password: yup
    .string()
    .min(6, "Minimum length is 6")
    .required("Please enter password"),
  confirm_password: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Password does not match"),
});
