import {
  Avatar,
  Box,
  CardContent,
  Container,
  LinkProps,
  Paper,
  SxProps,
  Theme,
  Typography,
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
function ExplorePostsGrid() {
  const contents = [
    {
      id: 1,
      avatar:
        "https://user-images.githubusercontent.com/116926631/233385334-05af6be5-c0bf-49ed-8691-2eed4ac15f62.jpeg",
      username: "Sadie Sink",
      location: "Gothenburg, Sweden",
      content:
        "https://user-images.githubusercontent.com/116926631/233002457-be833494-2c6d-4c8a-9932-81a0791893b6.JPG",
      title: "Found this pretty tree with these flowers!!!",
    },
    {
      id: 2,
      avatar:
        "https://user-images.githubusercontent.com/116926631/233385334-05af6be5-c0bf-49ed-8691-2eed4ac15f62.jpeg",
      username: "Sadie Sink",
      location: "Gothenburg, Sweden",
      content:
        "https://user-images.githubusercontent.com/116926631/233002218-326cfa34-5681-49de-b735-052333975003.JPG",
      title: "LOOK at these beauties!!!",
    },
    {
      id: 3,
      avatar:
        "https://user-images.githubusercontent.com/116926631/233385334-05af6be5-c0bf-49ed-8691-2eed4ac15f62.jpeg",
      username: "Sadie Sink",
      location: "Paris, France",
      content:
        "https://user-images.githubusercontent.com/116926631/233002175-166792cc-0b12-405f-8080-d081acae2507.JPG",
      title: "Amazing chairs, for an amazing Pedro.",
    },
    {
      id: 4,
      avatar:
        "https://user-images.githubusercontent.com/116926631/233385334-05af6be5-c0bf-49ed-8691-2eed4ac15f62.jpeg",
      username: "Sadie Sink",
      location: "Copenhagen, Denmark",
      content:
        "https://user-images.githubusercontent.com/116926631/233377366-b95d05f9-11a7-4d1b-9d9f-5d912a5e522f.JPG",
      title: "I took this.",
    },
    // More content objects here...
  ];

  return (
    <Container maxWidth="md" sx={rootStyle}>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {contents.map((contentItem) => {
            return (
              <Grid key={contentItem.id} xs={6} sm={6} md={6}>
                <StyledLink
                  to={`/user/:id`}
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
                          src={contentItem.avatar}
                          alt={contentItem.title}
                        />
                        <Box>
                          <Typography variant="subtitle1">
                            {contentItem.username}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#777777",
                            }}
                          >
                            {contentItem.location}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <img src={contentItem.content} alt={contentItem.title} />
                    <CardContent sx={cardContentStyle}>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ marginTop: "1rem" }}
                        >
                          {contentItem.title}
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

const rootStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
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
