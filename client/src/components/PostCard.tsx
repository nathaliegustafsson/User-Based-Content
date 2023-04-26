// PostPage.tsx
import {
  Box,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post, usePostContext } from "../context/PostContext";

function PostCard() {
  const { id } = useParams<{ id: string }>();
  const { getPostById } = usePostContext();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const fetchSinglePost = async () => {
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
      };
      fetchSinglePost();
    }
  }, [id, getPostById]);

  if (!post) {
    return <div>Sorry! The post was not found.</div>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Grid container>
          <Grid key={post.id} item xs={12} md={6}>
            <CardMedia
              component="img"
              image={post?.content}
              alt={post?.title}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "1rem",
                  gap: "1rem",
                }}
              >
                {/* <Avatar src={post.avatar} alt={post?.title} /> */}
                <Box>
                  <Typography variant="subtitle1">{post?.username}</Typography>
                  <Typography variant="caption" sx={{ color: "#777777" }}>
                    {/* {post?.location} */}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ marginTop: "1rem" }}>
                {post?.title}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PostCard;
