import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useTheme } from "@mui/material/styles";

import JobForm from "./JobForm";

import type { Job } from "../../../types/Job";
import type { SenderCompany } from "../../../types/SenderCompany";
import type { NewJobInput } from "../types";

interface EditJobDialogProps {
  open: boolean;

  job: Job | null;

  senderCompanies: SenderCompany[];

  onClose: () => void;

  onSave: (
    jobId: string,
    values: NewJobInput
  ) => void;
}

export default function EditJobDialog({
  open,
  job,
  senderCompanies,
  onClose,
  onSave,
}: EditJobDialogProps) {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  if (!job) {
    return null;
  }

  /*
   * Job has extra properties such as:
   *
   * id
   * status
   * createdAt
   *
   * JobForm only needs editable values.
   */
  const initialValues: NewJobInput = {
    buyerName:
      job.buyerName,

    buyerAddress: {
      ...job.buyerAddress,
    },

    contactNumber:
      job.contactNumber,

    senderCompanyId:
      job.senderCompanyId,

    parcelType:
      job.parcelType,

    parcelSize:
      job.parcelSize,

    deliveryDate:
      job.deliveryDate,

    notes:
      job.notes ?? "",
  };

  const handleSubmit = (
    values: NewJobInput
  ) => {
    onSave(
      job.id,
      values
    );

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
        Edit Delivery Job

        <IconButton
          aria-label="Close"
          onClick={onClose}
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
          /*
           * Important:
           *
           * If the user selects a different
           * table row, force JobForm to
           * remount with the new values.
           */
          key={job.id}

          senderCompanies={
            senderCompanies
          }

          initialValues={
            initialValues
          }

          submitLabel="Save Changes"

          onCancel={onClose}

          onSubmit={
            handleSubmit
          }
        />
      </DialogContent>
    </Dialog>
  );
}