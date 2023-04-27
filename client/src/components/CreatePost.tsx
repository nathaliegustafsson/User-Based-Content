import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties, ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { usePostContext } from "../context/PostContext";

const CreatePostSchema = Yup.object({
  title: Yup.string().required("Please enter a title"),
  content: Yup.string().required("Please enter your content"),
});

export type CreateProfileValues = Yup.InferType<typeof CreatePostSchema>;

function CreatePost() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { createPost } = usePostContext();
  const { username } = useParams<{ username: string }>();
  const onSubmit = async (createPostValues: CreateProfileValues) => {};

  const formik = useFormik<CreateProfileValues>({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: CreatePostSchema,
    onSubmit: async (createProfileValues) => {
      try {
        const post = createPost({
          title: createProfileValues.title,
          content: createProfileValues.content,
        });
        console.log(post + "post skapad");
        navigate(`/user/${username}`);
      } catch (error) {
        console.log(error);
      }
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
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Create a new post
      </Typography>
      <IconButton
        component={Link}
        to={`/user/${username}`}
        className="material-symbols-outlined"
        sx={{ color: "black" }}
      >
        arrow_back
      </IconButton>
      <Container
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          {imageUrl && (
            <Box
              component="img"
              src={imageUrl}
              sx={{
                width: "100%",
              }}
            ></Box>
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
              }}
            >
              <Typography variant="subtitle2">No image uploaded yet</Typography>
            </Box>
          )}
          <Typography variant="subtitle2">Preview</Typography>
        </Container>
        <Container
          sx={{
            marginTop: isSmallScreen ? "1rem" : "0",
          }}
        >
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
              sx={{
                "& .MuiInputBase-input": {
                  bgcolor: (theme) => theme.palette.secondary.main,
                  borderRadius: "0.6rem",
                },
                "& .MuiOutlinedInput-root": { borderRadius: "0.6rem" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: (theme) => theme.palette.secondary.main,
                },
              }}
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
              sx={{
                "& .MuiInputBase-input": {
                  bgcolor: (theme) => theme.palette.secondary.main,
                  borderRadius: "0.6rem",
                },
                "& .MuiOutlinedInput-root": { borderRadius: "0.6rem" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: (theme) => theme.palette.secondary.main,
                },
              }}
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
