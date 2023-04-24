import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

function EditAndDeletePost() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth={"md"}>
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center" }}>
        Edit or delete post
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
          flexDirection: isSmallScreen ? "column" : "row",
        }}>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            component="img"
            src="https://user-images.githubusercontent.com/116926631/233002175-166792cc-0b12-405f-8080-d081acae2507.JPG"
            sx={{
              width: "100%",
            }}></Box>
        </Container>
        <Container
          sx={{
            padding: "0px !important",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
                sx={{ width: "4rem", height: "4rem" }}
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
              <Typography sx={{ marginTop: "1rem" }}>
                Found this pretty tree with these flowers!!!
              </Typography>
            </Box>
          </Container>
          <Container
            sx={{
              padding: "0px !important",
            }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{ marginRight: "0.5rem" }}>
              Edit
            </Button>
            <Button component={Link} to="/" variant="contained">
              Delete
            </Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default EditAndDeletePost;
