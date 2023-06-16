import {
  Avatar,
  Box,
  CardContent,
  CardMedia,
  Container,
  LinkProps,
  Paper,
  SxProps,
  Theme,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePostContext } from "../context/PostContext";

/**
 * Returns a grid of posts to explore on the startpage
 */
function ExplorePostsGrid() {
  const { posts, getAllPosts } = usePostContext();

  const memoizedGetAllPosts = useCallback(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    memoizedGetAllPosts();
  }, [memoizedGetAllPosts]);

  return (
    <Container maxWidth="md" sx={rootStyle}>
      <Box>
        <Typography
          variant="h5"
          sx={{
            marginBottom: {
              xs: "2rem",
              sm: "3rem",
              md: "4rem", 
            },
          }}
        >
          Posts to Explore
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={{ xs: 2, sm: 3 }}
          columnSpacing={{ xs: 2, sm: 3 }}
        >
          {posts.map((post) => {
            console.log(posts);
            return (
              <Grid key={`${post._id}-${post.timestamp}`} xs={12} sm={6} md={6}>
                <StyledLink
                  to={`/posts/${post._id}`}
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  <Item>
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
                          alt="user avatar"
                        />
                        <Box>
                          <Typography variant="subtitle1">
                            {post.author.username}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#777777",
                            }}
                          >
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardMedia
                      component="img"
                      src={post.content}
                      alt={post.title}
                    />
                    <CardContent sx={cardContentStyle}>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ marginTop: "1rem" }}
                        >
                          {post.title}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Item>
                </StyledLink>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}

/* Styling */

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

const rootStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1.5rem",
};

const StyledLink = styled(Link)<LinkProps>(() => ({
  textDecoration: "none",
  color: "inherit",
}));

const cardContentStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "flex-start",
};

export default ExplorePostsGrid;
