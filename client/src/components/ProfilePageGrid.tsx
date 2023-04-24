import {
  Box,
  Container,
  LinkProps,
  SxProps,
  Theme,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

// export interface ContentItem {
//   id: number;
//   avatar: string;
//   username: string;
//   location: string;
//   content: string;
//   title: string;
// }

/**
 * Returns a grid of posts to explore
 */
function ProfilePageGrid() {
  const posts = [
    {
      id: 1,
      content:
        "https://user-images.githubusercontent.com/116926631/233002457-be833494-2c6d-4c8a-9932-81a0791893b6.JPG",
      title: "",
    },
    {
      id: 2,
      content:
        "https://user-images.githubusercontent.com/116926631/233002218-326cfa34-5681-49de-b735-052333975003.JPG",
      title: "",
    },
    {
      id: 3,
      content:
        "https://user-images.githubusercontent.com/116926631/233002175-166792cc-0b12-405f-8080-d081acae2507.JPG",
      title: "",
    },
    {
      id: 4,
      content:
        "https://user-images.githubusercontent.com/116926631/233503865-a6e3c5d1-8d99-4963-a394-1a4f04317aa9.JPG",
      title: "",
    },
    {
      id: 5,
      content:
        "https://user-images.githubusercontent.com/116926631/233503919-6db296c3-cc9f-4c9b-b3e4-075b388a039f.JPG",
      title: "",
    },
    {
      id: 6,
      content:
        "https://user-images.githubusercontent.com/116926631/233504429-96d2e88c-b395-43d7-af0d-233f57c66273.JPG",
      title: "",
    },
    {
      id: 7,
      content:
        "https://user-images.githubusercontent.com/116926631/233505131-c616efce-d454-4942-872c-3f625499e06a.JPG",
      title: "",
    },
    {
      id: 8,
      content:
        "https://user-images.githubusercontent.com/116926631/233505302-af6c72c4-1a3b-42d1-acdc-4330c768435c.JPG",
      title: "",
    },
    {
      id: 9,
      content:
        "https://user-images.githubusercontent.com/116926631/233505371-3674ef1f-b5d9-4a1c-bb48-ac146d68defe.JPG",
      title: "",
    },
    // More content objects here...
  ];

  return (
    <Container maxWidth="md" sx={rootStyle}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={{ xs: 0.5, sm: 1.5 }}
          columnSpacing={{ xs: 1, sm: 2 }}
        >
          {posts.map((postItem) => {
            return (
              <Grid key={postItem.id} xs={4} sm={4} md={4}>
                <StyledLink
                  to={`/posts/:id`}
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  <Box
                    component="img"
                    src={postItem.content}
                    alt={postItem.title}
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  ></Box>
                </StyledLink>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}

/*  Styling */

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
