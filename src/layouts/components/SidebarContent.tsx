import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  LocalShippingOutlined,
  BusinessOutlined,
  Inventory2Outlined,
  HelpOutlined,
} from "@mui/icons-material";

import { NavLink } from "react-router";

type SidebarContentProps = {
  onNavigate?: () => void;
};

const navItems = [
  {
    label: "Delivery Jobs",
    path: "/",
    icon: <LocalShippingOutlined />,
  },
  {
    label: "Companies",
    path: "/companies",
    icon: <BusinessOutlined />,
  },
  {
    label: "How to use",
    path: "/howtouse",
    icon: <HelpOutlined />,
  },
];

export default function SidebarContent({
  onNavigate,
}: SidebarContentProps) {
  return (
    <>
      {/* Logo */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: 2.5,
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Inventory2Outlined fontSize="small" />
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Parcel Flow
        </Typography>
      </Box>

      <Divider />

      {/* Navigation */}
      <List
        sx={{
          px: 1.5,
          py: 2,
        }}
      >
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.path === "/"}
            onClick={onNavigate}
            sx={{
              mb: 0.5,
              borderRadius: 2,

              color: "text.secondary",

              "&.active": {
                bgcolor: "primary.main",
                color: "primary.contrastText",

                "& .MuiListItemIcon-root": {
                  color: "inherit",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.label}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: 14,
                    fontWeight: 500,
                  },
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}