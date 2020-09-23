import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  remember_me: Yup.boolean()
});

export default loginSchema;
