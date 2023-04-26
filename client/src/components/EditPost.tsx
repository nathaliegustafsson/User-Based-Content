import {
  Avatar,
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
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Post, usePostContext } from "../context/PostContext";

const EditSchema = Yup.object({
  title: Yup.string().required("Write something"),
  content: Yup.string().required("Write url"),
});

export type EditValues = Yup.InferType<typeof EditSchema>;

function EditPost({ postId }: { postId: number }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { getPost, updatePost } = usePostContext();
  const [post, setPost] = React.useState<Post | null>(null);
  const isEdit = Boolean(post);

  React.useEffect(() => {
    async function fetchPost() {
      const post = await getPost(postId);
      setPost(post!);
    }

    fetchPost();
  }, [postId]);

  const formik = useFormik<EditValues>({
    initialValues: {
      title: isEdit ? post?.title ?? "" : "",
      content: isEdit ? post?.content ?? "" : "",
    },
    validationSchema: EditSchema,
    onSubmit: (post) => {
      if (isEdit) {
        updatePost(post);
      }
    },
  });

  return (
    <Container maxWidth={"md"}>
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center" }}>
        Edit post
      </Typography>
      <IconButton
        component={Link}
        to="/"
        className="material-symbols-outlined"
        sx={{ color: "black" }}>
        arrow_back
      </IconButton>
      <Container
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column-reverse" : "row",
        }}>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            component="img"
            // src="https://user-images.githubusercontent.com/116926631/233002457-be833494-2c6d-4c8a-9932-81a0791893b6.JPG"
            src={post?.content}
            sx={{
              width: "100%",
              marginTop: isSmallScreen ? "1rem" : "0",
            }}></Box>
        </Container>
        <Container
          sx={{
            padding: "0px !important",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: isSmallScreen ? "1rem" : "0",
          }}>
          <Container
            sx={{
              padding: "0px !important",
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>
              <Avatar
                alt="Remy Sharp"
                src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
                sx={{
                  width: isSmallScreen ? "3rem" : "4rem",
                  height: isSmallScreen ? "3rem" : "4rem",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  marginLeft: "1rem",
                }}>
                The Rock
              </Typography>
            </Box>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="title"
                  type="text"
                  label="Title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.title && formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  sx={{ marginTop: "1rem" }}
                />
                <Container
                  sx={{
                    padding: "0px !important",
                  }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginRight: "0.5rem", marginTop: "1rem" }}>
                    Save
                  </Button>
                </Container>
              </form>
            </Box>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default EditPost;
