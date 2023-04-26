import {
  Box,
  CardContent,
  CardMedia,
  Container,
  Paper,
  SxProps,
  Theme,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post, usePostContext } from "../context/PostContext";

function PostCard() {
  const { _id } = useParams<{ _id: string }>();
  const { getPostById } = usePostContext();
  const [post, setPost] = useState<Post | null>(null);
  const { posts, getAllPosts } = usePostContext();

  useEffect(() => {
    console.log("useEffect triggered");
    if (_id) {
      const fetchSinglePost = async () => {
        const fetchedPost = await getPostById(_id);
        console.log("fetchedPost", fetchedPost);
        if (fetchedPost) {
          setPost(fetchedPost);
        }
      };
      fetchSinglePost();
    }
  }, [_id, getPostById]);

  console.log("post", post);
  if (!post) {
    return <div>Sorry! The post was not found.</div>;
  }

  return (
    <Container maxWidth="lg" sx={rootStyle}>
      <Box>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid key={`${post?._id}-${post?.timestamp}`} xs={12} sm={12} md={12}>
            <Item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <CardMedia>
                <img src={post?.content} alt={post?.title} />
              </CardMedia>
              <CardContent sx={cardContentStyle}>
                <Typography variant="overline" sx={{ marginBottom: "1rem" }}>
                  {post.author}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                  {post?.title}
                </Typography>
              </CardContent>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

/*  Styling */

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.subtitle2,
  textAlign: "left",
  color: theme.palette.text.primary,
  cursor: "pointer",
  transition: "box-shadow 0.3s ease-in-out",
  boxShadow: "0 .125rem .625rem rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
}));

const cardContentStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  textAlign: "left",
  "@media (min-width: 960px)": {
    // Media query for desktop view
    width: "100%",
    height: "auto",
    paddingLeft: "2rem",
  },
};

const rootStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1.5rem",
};

export default PostCard;
