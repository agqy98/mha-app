import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from "@mui/material";


import { useTheme } from "@mui/material/styles";
import { Close as CloseIcon } from "@mui/icons-material";


import type { NewJobInput } from "../types";
import type { SenderCompany } from "../../../types/SenderCompany";
import JobForm from "./JobForm";

interface AddJobDialogProps {
  open: boolean;
  senderCompanies: SenderCompany[];

  onClose: () => void;
  onAdd: (job: NewJobInput) => void;
}

export default function AddJobDialog({
  open,
  senderCompanies,
  onClose,
  onAdd,
}: AddJobDialogProps) {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  const handleSubmit = (
    job: NewJobInput
  ) => {
    onAdd(job);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
    >
      <DialogTitle>
        Add Delivery Job

        <IconButton
          onClick={onClose}
          aria-label="Close dialog"
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <JobForm
          senderCompanies={
            senderCompanies
          }
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}