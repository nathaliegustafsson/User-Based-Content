import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Post, usePostContext } from "../context/PostContext";
import { useUserContext } from "../context/UserContext";

function EditAndDeletePost() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [deletePostDialogOpen, setDeletePostDialogOpen] = React.useState(false);
  const { _id } = useParams<{ _id: string }>();
  const { deletePost, getPostById } = usePostContext();
  const [post, setPost] = React.useState<Post | null>(null);
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { user } = useUserContext();

  React.useEffect(() => {
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

  return (
    <Container maxWidth={"md"}>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: isSmallScreen ? "2rem" : "",
        }}>
        Edit or delete post
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
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0px !important",
          }}>
          <Box
            component="img"
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
          <Container>
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
                {user?.username}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ marginTop: "1rem" }}>{post?.title}</Typography>
            </Box>
          </Container>
          <Container
            sx={{
              marginTop: isSmallScreen ? "1rem" : "",
            }}>
            <Button
              component={Link}
              to={`/user/${username}/posts/${_id}/edit`}
              variant="contained"
              sx={{ marginRight: "0.5rem" }}>
              Edit
            </Button>
            <Button
              onClick={() => setDeletePostDialogOpen(true)}
              variant="contained">
              Delete
            </Button>
            <Dialog
              open={deletePostDialogOpen}
              onClose={() => setDeletePostDialogOpen(false)}>
              <DialogTitle>Delete Post</DialogTitle>
              <DialogContent>
                <Typography variant="body1">
                  Are you sure you want to delete this post?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeletePostDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    if (_id) {
                      await deletePost(_id);
                      setDeletePostDialogOpen(false);
                      navigate(`/user/${username}`);
                    }
                  }}
                  color="primary"
                  autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default EditAndDeletePost;
