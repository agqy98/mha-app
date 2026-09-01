import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router";

import keyUserFlow from "../assets/keyUserFlow.png";
import { HelpOutlined as HelpOutlinedIcon } from "@mui/icons-material";

export default function HowToUsePage() {
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
          maxWidth: 1100,
          p: { xs: 3, sm: 4 },
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "action.hover",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <HelpOutlinedIcon
              color="primary"
              sx={{ fontSize: 30 }}
            />
          </Box>

          <Box>
            <Typography variant="h5">
              How to Use
            </Typography>

            <Typography color="text.secondary">
              Overview of the key user flows in the Parcel Flow application.
            </Typography>

          </Box>
        </Box>

        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "background.default",
          }}
        >
          <Box
            component="img"
            src={keyUserFlow}
            alt="Parcel Flow key user flows"
            sx={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>

        <Box
          sx={{
            mt: 2,
            px: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            component="ul"
            sx={{
              m: 0,
              pl: 2.5,
            }}
          >
            <li>
              Feel free to resize the browser window to test the responsive mobile view.
            </li>
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            Back to Delivery Jobs
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}