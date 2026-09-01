{/*
    This component is created to centralize the logic for Chip    
    <Chip
        label={job.status}
        color={...}
    /> 
*/}

import Chip from "@mui/material/Chip";

import type { JobStatus } from "../../../types/Job";

interface JobStatusChipProps {
  status: JobStatus;
}

export default function JobStatusChip({
  status,
}: JobStatusChipProps) {
  const color = (() => {
    switch (status) {
      case "Delivered":
        return "success";

      case "Pending":
        return "warning";

      case "In Transit":
        return "info";

      default:
        return "default";
    }
  })();

  return (
    <Chip
      label={status}
      color={color}
      size="small"
      variant="outlined"
    />
  );
}