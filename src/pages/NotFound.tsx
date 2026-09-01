import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: {
            xs: 3,
            sm: 5,
          },
          textAlign: "center",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LockOutlinedIcon
            color="primary"
            sx={{ fontSize: 32 }}
          />
        </Box>

        <Typography
          variant="h5"
          sx={{ mb: 1 }}
        >
          Access Denied
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          You are not authorised to view this page.
        </Typography>

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Back to Delivery Jobs
        </Button>
      </Paper>
    </Box>
  );
}