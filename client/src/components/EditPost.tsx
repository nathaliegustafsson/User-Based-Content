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
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Post, usePostContext } from "../context/PostContext";

const EditSchema = Yup.object({
  title: Yup.string().required("Write something"),
  content: Yup.string().required("Write url"),
});

export type EditValues = Yup.InferType<typeof EditSchema>;

function EditPost() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { getPostById, updatePost } = usePostContext();
  const { username } = useParams<{ username: string }>();
  const { _id } = useParams<{ _id: string }>();
  const [post, setPost] = React.useState<Post | null>(null);

  const formik = useFormik<EditValues>({
    initialValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
    validationSchema: EditSchema,
    onSubmit: (values) => {
      console.log("test if submit works" + values);
      if (post) {
        console.log("test if submit works again" + values);
        updatePost({
          ...post,
          title: values.title,
          content: values.content,
        });
        console.log("test if submit works againnnnnnn" + values);
      }
      navigate(`/user/${username}`);
    },
  });

  React.useEffect(() => {
    let isMounted = true; // Add this flag to check if the component is still mounted
    if (_id) {
      const fetchSinglePost = async () => {
        const fetchedPost = await getPostById(_id);
        if (fetchedPost && isMounted) {
          // Check if the component is still mounted before updating state
          setPost((prevPost) => ({
            ...prevPost,
            title: fetchedPost.title,
            content: fetchedPost.content,
            timestamp: fetchedPost.timestamp || "",
            _id: fetchedPost._id,
            author: fetchedPost.author,
            authorPostGrid: fetchedPost.authorPostGrid,
          }));
          formik.setValues({
            title: fetchedPost.title,
            content: fetchedPost.content,
          });
        }
      };
      fetchSinglePost();
    }
    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, [_id, getPostById]); // Remove formik from the dependency array

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
                }}>
                The Rock
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
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ marginRight: "0.5rem", marginTop: "1rem" }}>
                  Save
                </Button>
              </form>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default EditPost;
