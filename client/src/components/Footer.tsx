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
      }}>
      <Grid
        container
        maxWidth={"sm"}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Grid item xs>
          <List>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                <b>Company</b>
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>About us</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>Our Product</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>Careers</ListItemText>
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
              <ListItemText sx={hoverEffectStyling}>Guidelines</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>Safety</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>Support</ListItemText>
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
              <ListItemText sx={hoverEffectStyling}>Terms of use</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>
                Privacy Policy
              </ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>Cookie Notice</ListItemText>
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
              <ListItemText sx={hoverEffectStyling}>Brands</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: "0 1rem" }}>
              <ListItemText sx={hoverEffectStyling}>Press</ListItemText>
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
          }}></Box>
      </Link>
      <Typography sx={{ marginTop: "0.5rem" }}>Photo Share</Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: "200",
          fontSize: "12px",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}>
        Copyright 2023 Photo Share. All rights reserved
      </Typography>
    </Container>
  );
}

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
