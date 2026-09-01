import { Box } from "@mui/material";

import SidebarContent from "./SidebarContent";

const SIDEBAR_WIDTH = 240;

export default function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        height: "100vh",

        bgcolor: "background.paper",

        borderRight: 1,
        borderColor: "divider",

        position: "sticky",
        top: 0,
      }}
    >
      <SidebarContent />
    </Box>
  );
}