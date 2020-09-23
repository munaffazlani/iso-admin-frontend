import * as Yup from "yup";

const emailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export default emailSchema;;
