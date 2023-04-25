import * as Yup from "yup";

const postUpdateValidationSchema = Yup.object()
  .shape({
    title: Yup.string()
      .notRequired()
      .when("content", (content, schema) =>
        content
          ? schema
          : schema.required("At least one field to update is required")
      ),
    content: Yup.string().notRequired(),
  })
  .noUnknown("Additional properties are not allowed");

export default postUpdateValidationSchema;
