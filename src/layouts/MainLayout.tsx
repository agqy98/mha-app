import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MobileSidebar from "./components/MobileSidebar";

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Sidebar />
      </Box>

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Right side */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Header
          onMenuClick={() => setMobileOpen(true)}
        />

        <Box
          component="main"
          sx={{
            px: {
              xs: 2,
              md: 3,
            },

            pt: 1,
            pb: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}