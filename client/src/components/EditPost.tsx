import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditPost({ postId }: { postId: number }) {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

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
    <Container maxWidth="md">
      <Typography variant="h4">Edit Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          multiline
          rows={6}
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </Container>
  );
}

export default EditPost;
