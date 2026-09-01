import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { useColorMode } from "../../theme/AppThemeProvider";
import { usePageTitle } from "../../hooks/usePageTitle";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const { mode, toggleColorMode } = useColorMode();
  const title = usePageTitle();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        // Mobile = coloured header
        // Desktop = same colour as page
        bgcolor: {
          xs: "primary.main",
          md: "background.default",
        },

        color: {
          xs: "primary.contrastText",
          md: "text.primary",
        },

        // mobile gets no border,
        // desktop blends into page
        borderBottom: {
          xs: "none",
          md: 0,
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: {
            xs: "56px !important",
            md: "72px !important",
          },

          px: {
            xs: 2,
            md: 3,
          },
        }}
      >
        {/* Mobile hamburger */}
        <IconButton
          onClick={onMenuClick}
          aria-label="Open navigation"
          sx={{
            display: {
              xs: "inline-flex",
              md: "none",
            },

            color: "inherit",
            mr: 1,
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Adaptive page title */}
        <Typography
          component="h1"
          variant="h6"
          sx={{
            fontWeight: 700,

            fontSize: {
              xs: 18,
              md: 24,
            },
          }}
        >
          {title}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip
          title={
            mode === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          <IconButton
            onClick={toggleColorMode}
            aria-label="Toggle colour mode"
            sx={{
              color: "inherit",
            }}
          >
            {mode === "light" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}