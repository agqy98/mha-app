import {
  Box,
  Drawer,
} from "@mui/material";

import SidebarContent from "./SidebarContent";

const SIDEBAR_WIDTH = 240;

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        display: {
          xs: "block",
          md: "none",
        },

        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          bgcolor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          width: SIDEBAR_WIDTH,
        }}
      >
        <SidebarContent
          onNavigate={onClose}
        />
      </Box>
    </Drawer>
  );
}