import * as Yup from "yup";

const postUpdateValidationSchema = Yup.object()
  .shape({
    _id: Yup.string().required(),
    title: Yup.string().required(),
    content: Yup.string().required(),
    author: Yup.lazy((val) =>
      typeof val === "object"
        ? Yup.object({
            _id: Yup.string().required(),
            username: Yup.string().required(),
          }).required()
        : Yup.string().required()
    ),
    createdAt: Yup.string().required(),
  })
  .noUnknown();

export default postUpdateValidationSchema;
