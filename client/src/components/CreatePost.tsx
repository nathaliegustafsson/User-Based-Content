import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties, ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const CreatePostSchema = Yup.object({
  title: Yup.string().required("Please enter a title"),
  content: Yup.string()
    .required("Please enter your content")
    .url("Please enter a valid url"),
});

export type CreateProfileValues = Yup.InferType<typeof CreatePostSchema>;

function CreatePost() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const formik = useFormik<CreateProfileValues>({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: CreatePostSchema,
    onSubmit: (createPostValues) => {
      // createPost(createPostValues);
    },
  });

  const handleImageUrlChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formik.handleChange(event);
    setImageUrl(event.target.value);
  };

  return (
    <Container maxWidth={"md"}>
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center" }}>
        Create a new post
      </Typography>
      <IconButton
        component={Link}
        to="/"
        className="material-symbols-outlined"
        sx={{ color: "black" }}>
        arrow_back
      </IconButton>
      <Container sx={{ display: "flex" }}>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          {imageUrl && (
            <Box
              component="img"
              src={imageUrl}
              sx={{
                width: "100%",
              }}></Box>
          )}
          {!imageUrl && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "300px",
                border: "1px solid grey",
              }}>
              <Typography variant="subtitle2">No image uploaded yet</Typography>
            </Box>
          )}
          <Typography variant="subtitle2">Preview</Typography>
        </Container>
        <Container>
          <form onSubmit={formik.handleSubmit} style={rootStyle}>
            <TextField
              id="title"
              type="text"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.title && formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              id="content"
              type="text"
              name="content"
              label="Content/Image URL"
              value={formik.values.content}
              onChange={(event) => {
                handleImageUrlChange(event);
                formik.handleChange(event);
              }}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.content && formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
            <Button type="submit" variant="contained">
              Post
            </Button>
          </form>
        </Container>
      </Container>
    </Container>
  );
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

export default CreatePost;
