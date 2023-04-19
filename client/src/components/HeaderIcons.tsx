import { Box, IconButton, SxProps, Theme } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * Renders icons to the right, inside the HeaderMain component
 */
function HeaderIcons() {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
      }}>
      <IconButton
        className="material-symbols-outlined"
        sx={iconStyle}
        component={Link}
        to="/admin"
        data-cy="admin-link">
        admin_panel_settings
      </IconButton>
      <IconButton
        className="material-symbols-outlined"
        sx={iconStyle}
        component={Link}
        to="/underconstruction">
        favorite
      </IconButton>
      <IconButton
        component={Link}
        to="/checkout"
        data-cy="cart-link"
        className="material-symbols-outlined"
        onClick={() => {
          window.scroll(0, 0);
        }}
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", cursor: "pointer" },
          color: (theme) => theme.palette.text.primary,
          padding: 0,
        }}>
        shopping_bag
      </IconButton>
    </Box>
  );
}

/* Styling */

const iconStyle: SxProps<Theme> = {
  fontSize: { xs: "2rem", sm: "2.5rem" },
  cursor: "pointer",
  padding: { xs: "0rem", md: "0.3rem" },
  color: "black",
};

export default HeaderIcons;
