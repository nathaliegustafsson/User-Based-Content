import { Box, Button, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useUserContext } from "../context/UserContext";

const CreateProfileSchema = Yup.object({
  username: Yup.string().required("Please enter a username"),
  password: Yup.string()
    .min(5, "Your password needs to be at least 5 characters")
    .required("Please enter a password"),
});

export type CreateProfileValues = Yup.InferType<typeof CreateProfileSchema>;

function CreateProfileForm() {
  const { register, login } = useUserContext();
  const navigate = useNavigate();
  const formik = useFormik<CreateProfileValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: CreateProfileSchema,
    onSubmit: async (createProfileValues) => {
      try {
        const user = await register(
          createProfileValues.username,
          createProfileValues.password
        );
        await login(createProfileValues.username, createProfileValues.password);
        navigate("/user/:id");
        console.log(user);
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
      <Typography variant="h5" sx={{ marginBottom: "1.1rem" }}>
        Create a profile
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
        Create a profile to be able to share your photos
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": {
              m: 2,
              width: "35ch",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2.5rem",
            }}>
            <Button variant="contained" type="submit" sx={{ width: "6rem" }}>
              Sign up
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "4rem",
            }}>
            <Typography variant="body2" sx={{ color: "#696969" }}>
              By signing up, you agree to Photo Share's
            </Typography>
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              Terms of Use & Privacy Policy
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5rem",
            }}>
            <Typography variant="body1">Already have a profile?</Typography>
            <Typography
              variant="body1"
              component={Link}
              to="/signin"
              sx={{ marginLeft: "0.4rem", color: "black" }}>
              Log in
            </Typography>
          </Box>
        </Box>
      </form>
    </Container>
  );
}

export default CreateProfileForm;
