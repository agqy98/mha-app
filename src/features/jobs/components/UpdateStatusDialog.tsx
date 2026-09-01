import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import {
  JOB_STATUSES,
} from "../constants/jobOptions";

import type {
  JobStatus,
} from "../../../types/Job";

interface UpdateStatusDialogProps {
  open: boolean;
  selectedCount: number;

  onClose: () => void;

  onUpdate: (
    status: JobStatus
  ) => void;
}

export default function UpdateStatusDialog({
  open,
  selectedCount,
  onClose,
  onUpdate,
}: UpdateStatusDialogProps) {
  const [status, setStatus] =
    useState<JobStatus>("Pending");

  const handleUpdate = () => {
    onUpdate(status);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Update Delivery Status
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
          }}
        >
          {selectedCount} job
          {selectedCount !== 1 ? "s" : ""} selected
        </Typography>

        <TextField
          select
          fullWidth
          label="Status"
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as JobStatus
            )
          }
        >
          {JOB_STATUSES.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}