import {
  Avatar,
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
  // const { posts, getAllPosts } = usePostContext();

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
                flexDirection: { xs: "column-reverse", md: "row" },
              }}
            >
              <CardMedia>
                <img src={post?.content} alt={post?.title} />
              </CardMedia>
              <CardContent sx={cardContentStyle}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    gap: "1rem",
                  }}
                >
                  <Avatar
                    src="https://user-images.githubusercontent.com/116926631/233385334-05af6be5-c0bf-49ed-8691-2eed4ac15f62.jpeg"
                    alt={post.title}
                  />
                  <Box>
                    <Typography variant="subtitle1">
                      Sadie Sink {post.author.username}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#777777",
                        marginBottom: "3rem",
                      }}
                    >
                      Malmö, Sweden{/* {postItem.location} */}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "3rem" }}>
                  <Typography variant="caption">{post.title}</Typography>
                </Box>
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
  paddingBottom: "0",
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
