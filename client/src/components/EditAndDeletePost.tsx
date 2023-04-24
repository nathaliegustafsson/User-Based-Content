import {
  Box,
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
      </Container>
    </Container>
  );
}

export default EditAndDeletePost;
