import {
  AppBar,
  Box,
  Button,
  Container,
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

const pages = ["Home", "Explore"];
const loggedInSettings = ["Profile", "Account", "Logout"];
const settings = ["Create profile", "Login"];

function Header() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

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
    ? ["Create profile"]
    : ["Create profile", "Login"];
  const loggedInSettings = isLoggedIn ? ["Profile", "Account", "Logout"] : [];

  return (
    <AppBar
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
            justifyContent: { xs: "space-between", md: "space-between" },
          }}>
          <Box
            component="img"
            src="./src/assets/share-thin.png"
            alt="logo photo share"
            sx={{
              height: { xs: "4rem", md: "5rem" },
              display: { xs: "none", md: "flex" },
            }}></Box>

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
          <Box
            component="img"
            src="./src/assets/share-thin.png"
            alt="logo photo share"
            sx={{
              height: isSmallScreen ? "4rem" : "5rem",
              display: { xs: "flex", md: "none" },
            }}></Box>
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
                  fontSize: { xs: "2.5rem", sm: "3rem", cursor: "pointer" },
                  color: (theme) => theme.palette.text.primary,
                  padding: 0,
                }}>
                {/* Do a isLoggedIn thing for changing icon to photo */}
                account_circle
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
                    <MenuItem key={option} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{option}</Typography>
                    </MenuItem>
                  ))
                : settings.map((option) => (
                    <MenuItem key={option} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{option}</Typography>
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
