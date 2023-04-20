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

/**
 * Returns a grid of posts to explore with image, title and content
 */
function ExploreGrid() {
  const contents = [
    {
      id: 1,
      avatar:
        "https://user-images.githubusercontent.com/116926631/233385334-05af6be5-c0bf-49ed-8691-2eed4ac15f62.jpeg",
      username: "sadiesink",
      content:
        "https://user-images.githubusercontent.com/116926631/233002457-be833494-2c6d-4c8a-9932-81a0791893b6.JPG",
      title: "Found this pretty tree with these flowers!!!",
    },
    {
      id: 2,
      avatar:
        "https://user-images.githubusercontent.com/116926631/233385334-05af6be5-c0bf-49ed-8691-2eed4ac15f62.jpeg",
      username: "sadiesink",
      content:
        "https://user-images.githubusercontent.com/116926631/233002218-326cfa34-5681-49de-b735-052333975003.JPG",
      title: "LOOK at these beauties!!!",
    },
    {
      id: 3,
      avatar:
        "https://user-images.githubusercontent.com/116926631/233385334-05af6be5-c0bf-49ed-8691-2eed4ac15f62.jpeg",
      username: "sadiesink",
      content:
        "https://user-images.githubusercontent.com/116926631/233002175-166792cc-0b12-405f-8080-d081acae2507.JPG",
      title: "Amazing chairs, for an amazing Pedro.",
    },
    {
      id: 4,
      avatar:
        "https://user-images.githubusercontent.com/116926631/233385334-05af6be5-c0bf-49ed-8691-2eed4ac15f62.jpeg",
      username: "sadiesink",
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
                  to={contentItem.content}
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
                        <Typography variant="subtitle1">
                          {contentItem.username}
                        </Typography>
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
  //   boxShadow: "none",
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
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "0.4rem",
};

export default ExploreGrid;
