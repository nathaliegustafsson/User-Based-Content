import { Avatar, Box, Button, Container, Typography } from "@mui/material";

function UserInfo() {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <Avatar
        alt="Remy Sharp"
        src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
        sx={{ width: "5rem", height: "5rem" }}
      />
      <Typography variant="h5">{/*username*/}The Rock</Typography>
      <Typography variant="subtitle2" color={"#696969"} marginTop={"0.2rem"}>
        Gothenburg, Sweden
      </Typography>
      <Typography marginTop={"0.8rem"}>
        I'm The Rock and here's some of my best flowers. Enjoy.
      </Typography>
      <Box sx={{ marginTop: "1rem", "& > *": { mx: 1 } }}>
        <Button variant="contained">Create</Button>
        <Button variant="contained">Edit profile</Button>
      </Box>
    </Container>
  );
}

export default UserInfo;
