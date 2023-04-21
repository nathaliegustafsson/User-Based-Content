// user-validation.ts
import * as Yup from "yup";

export const userRegistrationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  isAdmin: Yup.boolean().notRequired(),
});
