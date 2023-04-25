import * as Yup from "yup";

const postCreateValidationSchema = Yup.object()
  .shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  })
  .noUnknown("Additional properties are not allowed");

export default postCreateValidationSchema;
