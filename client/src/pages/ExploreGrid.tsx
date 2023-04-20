import {
  Box,
  CardContent,
  Container,
  LinkProps,
  Paper,
  styled,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

/**
 * Returns a grid of posts to explore with image and content
 */
function ExploreGrid() {
  const urls = [
    {
      id: 1,
      title: "Example Title 1",
      url: "https://user-images.githubusercontent.com/116926631/233002457-be833494-2c6d-4c8a-9932-81a0791893b6.JPG",
      description: "This is a description of Example Title 1",
    },
    {
      id: 2,
      title: "Example Title 2",
      url: "https://user-images.githubusercontent.com/116926631/233002175-166792cc-0b12-405f-8080-d081acae2507.JPG",
      description: "This is a description of Example Title 2",
    },
    {
      id: 3,
      title: "Example Title 3",
      url: "https://user-images.githubusercontent.com/116926631/233002218-326cfa34-5681-49de-b735-052333975003.JPG",
      description: "This is a description of Example Title 3",
    },
    // More URL objects here...
  ];

  return (
    <Container maxWidth="xl" sx={rootStyle}>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {urls.map((urlItem) => {
            return (
              <Grid key={urlItem.id} xs={12} sm={6} md={4} data-cy="url">
                <StyledLink
                  to={urlItem.url}
                  onClick={() => {
                    window.scroll(0, 0);
                  }}
                >
                  <Item>
                    <img src={urlItem.url} alt={urlItem.title} />
                    <CardContent sx={cardContentStyle}>
                      <Box>
                        <Typography variant="subtitle2" data-cy="url-title">
                          {urlItem.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ marginTop: "1rem" }}
                          data-cy="url-description"
                        >
                          {urlItem.description}
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
