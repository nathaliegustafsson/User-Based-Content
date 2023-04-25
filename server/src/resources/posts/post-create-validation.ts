import * as Yup from "yup";

const postCreateValidationSchema = Yup.object()
  .shape({
    title: Yup.string().required().strict(),
    content: Yup.string().required().strict(),
  })
  .noUnknown("Additional properties are not allowed");

export default postCreateValidationSchema;
