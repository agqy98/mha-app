import {
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

import Box from "@mui/material/Box";

import type { SenderCompany } from "../../../types/SenderCompany";
import type { JobFilters } from "../types";

import {
  JOB_STATUSES,
  PARCEL_TYPES,
} from "../constants/jobOptions";

interface JobsFilterBarProps {
  filters: JobFilters;
  senderCompanies: SenderCompany[];

  onChange: (filters: JobFilters) => void;
  onClear: () => void;
}

export default function JobsFilterBar({
  filters,
  senderCompanies,
  onChange,
  onClear,
}: JobsFilterBarProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: "1fr 1fr 1fr 1fr auto",
        },
        gap: 2,
        mb: 2,
      }}
    >
      <TextField
        select
        size="small"
        label="Status"
        value={filters.status}
        onChange={(event) =>
          onChange({
            ...filters,
            status: event.target.value as JobFilters["status"],
          })
        }
      >
        <MenuItem value="">
          All Statuses
        </MenuItem>

        {JOB_STATUSES.map((status) => (
          <MenuItem
            key={status}
            value={status}
          >
            {status}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Sender Company"
        value={filters.senderCompanyId}
        onChange={(event) =>
          onChange({
            ...filters,
            senderCompanyId: event.target.value,
          })
        }
      >
        <MenuItem value="">
          All Companies
        </MenuItem>

        {senderCompanies.map((company) => (
          <MenuItem
            key={company.id}
            value={company.id}
          >
            {company.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Parcel Type"
        value={filters.parcelType}
        onChange={(event) =>
          onChange({
            ...filters,
            parcelType: event.target.value as JobFilters["parcelType"],
          })
        }
      >
        <MenuItem value="">
          All Types
        </MenuItem>

        {PARCEL_TYPES.map((type) => (
          <MenuItem
            key={type}
            value={type}
          >
            {type}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        size="small"
        type="date"
        label="Delivery Date"
        value={filters.deliveryDate}
        onChange={(event) =>
          onChange({
            ...filters,
            deliveryDate: event.target.value,
          })
        }
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />

      <Button
        variant="outlined"
        onClick={onClear}
      >
        Clear
      </Button>
    </Box>
  );
}