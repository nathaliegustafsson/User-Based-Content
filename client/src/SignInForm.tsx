import { Button, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

function SignInForm() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "1rem",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Sign In
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": {
            m: 2,
            width: "35ch",
            borderRadius: "0.6rem",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-username-input"
          label="Username"
          sx={{
            bgcolor: (theme) => theme.palette.secondary.main,
            "& .MuiOutlinedInput-root": { borderRadius: "0.6rem" },
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{
            bgcolor: (theme) => theme.palette.secondary.main,
            "& .MuiOutlinedInput-root": { borderRadius: "0.6rem" },
          }}
        />
        <Box>
          <Typography variant="subtitle2" sx={{ marginLeft: "1.1rem" }}>
            Forgot Password?
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
        >
          <Button variant="contained" sx={{ width: "6rem" }}>
            Sign in
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <Typography variant="body1" sx={{ marginLeft: "1.1rem" }}>
            New to Photo Share?
          </Typography>
          <Typography
            variant="body1"
            component={Link}
            to="/createprofile"
            sx={{ marginLeft: "0.4rem", color: "black" }}
          >
            Join now
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignInForm;
