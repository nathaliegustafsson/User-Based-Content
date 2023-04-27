import { Box, Button, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useUserContext } from "../context/UserContext";

const SignInSchema = Yup.object({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string().required("Please enter your password"),
});

export type SignInValues = Yup.InferType<typeof SignInSchema>;

function SignInForm() {
  const { login } = useUserContext();
  const navigate = useNavigate();
  const formik = useFormik<SignInValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: async (signInValues) => {
      try {
        const loggedInUser = await login(
          signInValues.username,
          signInValues.password
        );
        console.log(loggedInUser + "INLOGGAD!");
        navigate(`/user/${loggedInUser.username}`);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "1rem",
      }}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Log in
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": {
              m: 2,
              // width: "35ch",
              borderRadius: "0.6rem",
            },
          }}>
          <TextField
            id="outlined-username-input"
            name="username"
            label="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            error={Boolean(formik.touched.username && formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{
              "& .MuiInputBase-input": {
                bgcolor: (theme) => theme.palette.secondary.main,
                borderRadius: "0.6rem",
              },
              "& .MuiOutlinedInput-root": { borderRadius: "0.6rem" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: (theme) => theme.palette.secondary.main,
              },
            }}
          />
          <TextField
            id="outlined-password-input"
            name="password"
            label="Password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="current-password"
            sx={{
              "& .MuiInputBase-input": {
                bgcolor: (theme) => theme.palette.secondary.main,
                borderRadius: "0.6rem",
              },
              "& .MuiOutlinedInput-root": { borderRadius: "0.6rem" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: (theme) => theme.palette.secondary.main,
              },
            }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                marginLeft: "1.1rem",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                  textDecorationThickness: "0.05rem",
                  textUnderlineOffset: "0.1rem",
                },
              }}>
              Forgot Password?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
            }}>
            <Button variant="contained" type="submit" sx={{ width: "6rem" }}>
              Log in
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5rem",
            }}>
            <Typography variant="body1">New to Photo Share?</Typography>
            <Typography
              variant="body1"
              component={Link}
              to="/createprofile"
              sx={{ marginLeft: "0.4rem", color: "black" }}>
              Join now
            </Typography>
          </Box>
        </Box>
      </form>
    </Container>
  );
}

export default SignInForm;
