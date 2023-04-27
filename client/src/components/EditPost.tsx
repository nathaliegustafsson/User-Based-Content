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
import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Post, usePostContext } from "../context/PostContext";
import { useUserContext } from "../context/UserContext";

const EditSchema = Yup.object({
  title: Yup.string().required("Write something"),
  content: Yup.string().required("Write url"),
});

export type EditValues = Yup.InferType<typeof EditSchema>;

function EditPost() {
  const { getPostById, updatePost } = usePostContext();
  const { _id } = useParams<{ _id?: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const theme = useTheme();
  const { username } = useParams<{ username: string }>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useUserContext();

  useEffect(() => {
    if (_id) {
      const fetchSinglePost = async () => {
        const fetchedPost = await getPostById(_id);
        if (fetchedPost) {
          setPost(fetchedPost);
        }
      };
      fetchSinglePost();
    }
  }, [_id, getPostById]);

  const initialValues = {
    title: post?.title || "",
    content: post?.content || "",
  };

  const formik = useFormik<EditValues>({
    initialValues,
    validationSchema: EditSchema,
    onSubmit: (values) => {
      if (post && _id) {
        const author =
          typeof post.author === "string" ? { _id: post.author } : post.author;
        const updatedPost: Post = {
          ...post,
          title: values.title,
          content: values.content,
          author: author._id.toString(),
          timestamp: post.timestamp,
        };
        updatePost(updatedPost);
        navigate(`/user/${username}`);
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
        to={`/user/${username}`}
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
                }}
              >
                {user?.username}
              </Typography>
            </Box>
            <Container sx={{ padding: "0px !important" }}>
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
                <TextField
                  fullWidth
                  id="content"
                  type="text"
                  label="Content"
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.content && formik.errors.content
                  )}
                  helperText={formik.touched.content && formik.errors.content}
                  sx={{ marginTop: "1rem" }}
                />
                <Container
                  sx={{
                    padding: "0px !important",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginRight: "0.5rem", marginTop: "1rem" }}
                  >
                    Save
                  </Button>
                </Container>
              </form>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default EditPost;
