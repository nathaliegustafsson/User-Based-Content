import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";

const pages = ["Explore", "Search"];
const loggedInSettings = ["Profile", "Account", "Logout"];
const settings = ["Create profile", "Login"];

function Header() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleCloseUserMenu();
  };

  const settings = isLoggedIn
    ? [{ name: "Create profile", link: "/createprofile" }]
    : [
        { name: "Create profile", link: "/createprofile" },
        { name: "Login", link: "/signin" },
      ];
  const loggedInSettings = isLoggedIn
    ? [
        { name: "Profile", link: "/user/:id" },
        { name: "Logout", link: "/SignOutPage" },
      ]
    : [];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: (theme) => theme.palette.background.default,
        padding: { xs: "0.5rem", md: "1rem" },
      }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Link to="/">
            <Box
              component="img"
              src="/src/assets/share-thin.png"
              alt="logo photo share"
              sx={{
                height: isSmallScreen ? "4rem" : "5rem",
                display: { xs: "none", md: "flex" },
              }}></Box>
          </Link>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              className="material-symbols-outlined"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", cursor: "pointer" },
                color: (theme) => theme.palette.text.primary,
                padding: 0,
              }}>
              menu
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                mt: "45px",
              }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to="/">
            <Box
              component="img"
              src="/src/assets/share-thin.png"
              alt="logo photo share"
              sx={{
                height: isSmallScreen ? "4rem" : "5rem",
                display: { xs: "flex", md: "none" },
              }}></Box>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: "1rem",
            }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: "1.2rem",
                }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                className="material-symbols-outlined"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  padding: 0,
                }}>
                {isLoggedIn ? (
                  <Avatar src={"/react.svg"} alt="User avatar" />
                ) : (
                  <Icon
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3rem", cursor: "pointer" },
                    }}>
                    account_circle
                  </Icon>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {isLoggedIn
                ? loggedInSettings.map((option) => (
                    <MenuItem key={option.name} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={option.link}>
                          {option.name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))
                : settings.map((option) => (
                    <MenuItem key={option.name} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={option.link}>
                          {option.name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
