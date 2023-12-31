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
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { Link, LinkProps, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

type UserMenuItem = {
  name: string;
  link?: string;
  handleClick?: () => void;
};

function Header() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const userContext = useUserContext();
  const { user, login, logout } = userContext;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

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
    handleCloseUserMenu();
    navigate("/signin");
  };

  const handleCreateProfile = () => {
    handleCloseUserMenu();
    navigate("/createprofile");
  };

  const handleLogout = () => {
    userContext.logout().then(() => {
      setIsLoggedIn(false);
      handleCloseUserMenu();
      navigate("/");
    });
  };

  const pages = [
    { name: "Explore", link: "/" },
    { name: "Search", link: "/" },
  ];

  const settings = isLoggedIn
    ? []
    : [
        { name: "Create profile", handleClick: handleCreateProfile },
        { name: "Login", handleClick: handleLogin },
      ];

  const loggedInSettings = isLoggedIn
    ? [
        { name: "Profile", link: `/user/${user?.username}` },
        { name: "Logout", handleClick: handleLogout },
      ]
    : [];

  const renderUserMenuItems = (items: UserMenuItem[]) => {
    return items.map((item, index) => {
      if (item.link) {
        return (
          <MenuItem key={index} onClick={handleCloseUserMenu}>
            <StyledLink to={item.link}>{item.name}</StyledLink>
          </MenuItem>
        );
      } else if (item.handleClick) {
        return (
          <MenuItem key={index} onClick={item.handleClick}>
            {item.name}
          </MenuItem>
        );
      } else {
        return null;
      }
    });
  };

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
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}>
            <StyledLink to="/">
              <Box
                component="img"
                src="/src/assets/share-thin.png"
                alt="logo photo share"
                sx={{
                  height: isSmallScreen ? "3rem" : "4rem",
                }}></Box>
            </StyledLink>
          </Box>

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
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <StyledLink to="/">
            <Box
              component="img"
              src="/src/assets/share-thin.png"
              alt="logo photo share"
              sx={{
                height: isSmallScreen ? "3rem" : "4rem",
                display: { xs: "flex", md: "none" },
              }}></Box>
          </StyledLink>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: "1rem",
            }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: "1.2rem",
                }}>
                {page.name}
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
                  <Avatar
                    src={
                      "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
                    }
                    alt="User avatar"
                  />
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
              {renderUserMenuItems(settings)}
              {renderUserMenuItems(loggedInSettings)}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

/* Styling */

const StyledLink = styled(Link)<LinkProps>(() => ({
  textDecoration: "none",
  color: "inherit",
}));

export default Header;
