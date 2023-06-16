import {
  Box,
  Container,
  LinkProps,
  SxProps,
  Theme,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePostContext } from "../context/PostContext";
import { useUserContext } from "../context/UserContext";

/**
 * Returns a grid of posts to explore
 */
function ProfilePageGrid() {
  const { user } = useUserContext();
  const { posts, getAllPostsByUser } = usePostContext();
  const { username } = useParams<{
    username: string;
  }>();

  useEffect(() => {
    if (user && user._id) {
      getAllPostsByUser(user._id);
    }
  }, [user]);

  return (
    <Container maxWidth="md" sx={rootStyle}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={{ xs: 0.5, sm: 1.5 }}
          columnSpacing={{ xs: 1, sm: 2 }}>
          {posts.map((post) => {
            return (
              <Grid key={post._id} xs={4} sm={4} md={4}>
                <StyledLink
                  to={`/user/${username}/posts/${post._id}/editdelete`}
                  onClick={() => {
                    window.scroll(0, 0);
                  }}>
                  <Box
                    component="img"
                    src={post.content}
                    alt={post.title}
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}></Box>
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

const rootStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1.5rem",
};

const StyledLink = styled(Link)<LinkProps>(() => ({
  textDecoration: "none",
  color: "inherit",
}));

export default ProfilePageGrid;
