import { Theme, useTheme } from "@emotion/react";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  SxProps,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function Footer() {
  const theme = useTheme();
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: (theme) => theme.palette.secondary.main,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "4rem",
        paddingTop: "1rem",
      }}
    >
      <Grid
        container
        maxWidth={"sm"}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs>
          <List>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <b>Company</b>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">About Us</Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Our Product</Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Careers</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs>
          <List>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <b>Community</b>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Guidelines</Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Safety</Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Support</Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Forum</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs>
          <List>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <b>Legal</b>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Terms of Use</Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Privacy Policy</Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Cookie Notice</Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Cookie Settings</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs>
          <List>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <b>Contact</b>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Brands</Typography>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <Typography variant="body2">Press</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <Link to="/">
        <Box
          component="img"
          src="/src/assets/share-thin.png"
          sx={{
            height: "4rem",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>
      </Link>
      <Typography sx={{ marginTop: "0.5rem" }}>Photo Share</Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: "200",
          fontSize: "12px",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        Copyright 2023 Photo Share. All rights reserved
      </Typography>
    </Container>
  );
}

/* Styling */

const hoverEffectStyling: SxProps<Theme> = {
  textAlign: "center",
  "&:hover": {
    textDecoration: "underline",
    textDecorationThickness: "0.01rem",
    textUnderlineOffset: "0.4rem",
    cursor: "pointer",
  },
};

export default Footer;
