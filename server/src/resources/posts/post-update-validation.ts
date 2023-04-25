import * as Yup from "yup";

const postUpdateValidationSchema = Yup.object()
  .shape({
    _id: Yup.string().required(),
    title: Yup.string().required(),
    content: Yup.string().required(),
    author: Yup.string().required(),
    createdAt: Yup.string().required(),
  })
  .noUnknown("Additional properties are not allowed");

export default postUpdateValidationSchema;
