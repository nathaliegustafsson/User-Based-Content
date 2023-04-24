import { Box, Container, IconButton } from "@mui/material";
import * as Yup from "yup";

const CreatePostSchema = Yup.object({
  username: Yup.string().required("Please enter a username"),
  password: Yup.string()
    .min(5, "Your password needs to be at least 5 characters")
    .required("Please enter a password"),
});

export type CreateProfileValues = Yup.InferType<typeof CreatePostSchema>;

function CreatePost() {
  return (
    <Container maxWidth={"md"}>
      <IconButton className="material-symbols-outlined">arrow_back</IconButton>
      <Container>
        <Box
          component="img"
          src="https://user-images.githubusercontent.com/116926631/233505302-af6c72c4-1a3b-42d1-acdc-4330c768435c.JPG"
          sx={{
            width: "50%",
          }}></Box>
      </Container>
      <Container></Container>
    </Container>
  );
}

export default CreatePost;
