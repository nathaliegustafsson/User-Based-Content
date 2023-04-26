import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePostContext } from "../context/PostContext";

function EditPost({ postId }: { postId: number }) {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { getPost } = usePostContext();

  React.useEffect(() => {
    async function fetchPost() {
      const post = await getPost(postId);
      setPost(post!);
    }

    fetchPost();
  }, [postId]);

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(`/api/posts/${postId}`);
      const post = await response.json();
      setPost(post);
      setFormData({
        title: post.title,
        content: post.content,
      });
      setLoading(false);
    }
    fetchPost();
  }, [postId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setLoading(false);
    navigate(`/posts/${postId}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

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
            // src={post?.content}
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
              <form>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  sx={{ marginTop: "1rem" }}
                />
              </form>
            </Box>
          </Container>
          <Container
            sx={{
              padding: "0px !important",
            }}>
            <Button
              component={Link}
              to="/user/:id/edit/post"
              variant="contained"
              sx={{ marginRight: "0.5rem" }}>
              Save
            </Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default EditPost;
