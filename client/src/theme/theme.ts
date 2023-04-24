import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#232A24",
      dark: "#737C74",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    secondary: {
      main: "#FCF2D3",
    },
  },
  typography: {
    button: {
      fontFamily: "Marcellus",
      textTransform: "none",
    },
    body2: {
      fontFamily: "Mulish",
    },
    body1: {
      fontFamily: "Marcellus",
    },
    subtitle2: {
      fontFamily: "Marcellus",
    },
    subtitle1: {
      fontFamily: "Marcellus",
    },
    h6: {
      fontFamily: "Marcellus",
    },
    h5: {
      fontFamily: "Marcellus",
    },
    h4: {
      fontFamily: "Marcellus",
    },
    h3: {
      fontFamily: "Marcellus",
    },
    h2: {
      fontFamily: "Marcellus",
    },
    h1: {
      fontFamily: "Marcellus",
    },
    caption: {
      fontFamily: "Mulish",
    },
    overline: {
      fontFamily: "Mulish",
    },
  },
});
