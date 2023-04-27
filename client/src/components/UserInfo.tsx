import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function UserInfo() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const userContext = useUserContext();
  const { user, login, logout } = userContext;
  const { _id } = useParams<{ _id: string }>();

  React.useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);
  React.useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    userContext.logout();
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "2.5rem",
      }}
    >
      <Avatar
        alt={user?.username}
        src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
        sx={{ width: "6rem", height: "6rem", marginBottom: "0.5rem" }}
      />
      <Typography variant="h5">{user?.username}</Typography>
      <Typography variant="body2" color={"#696969"} marginTop={"0.5rem"}>
        Gothenburg, Sweden
      </Typography>
      <Typography variant="body2" marginTop={"0.8rem"}>
        I'm The Rock and here's some of my best flowers. Enjoy.
      </Typography>
      <Box sx={{ marginTop: "1.3rem" }}>
        {isLoggedIn ? (
          <>
            <Button
              variant="contained"
              component={Link}
              to={`/user/${user?.username}/posts/create`}
              sx={{ marginRight: "1rem" }}
            >
              Create
            </Button>
            <Button
              variant="contained"
              component={Link}
              to={`/user/${user?.username}/posts/${_id}/edit`}
            >
              Edit profile
            </Button>
          </>
        ) : (
          <Button variant="contained">Share</Button>
        )}
      </Box>
    </Container>
  );
}

export default UserInfo;
