// It does not perform searching itself. 
// It simply tells the parent that the search text changed.

import {
  Button,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface JobsToolbarProps {
  search: string;
  selectedCount: number;

  onSearchChange: (value: string) => void;
  onToggleFilters: () => void;
  onAddJob: () => void;
  onUpdateStatus: () => void;
}

export default function JobsToolbar({
  search,
  selectedCount,
  onSearchChange,
  onToggleFilters,
  onAddJob,
  onUpdateStatus,
}: JobsToolbarProps) {
  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      spacing={2}
      sx={{ mb: 2 }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Search by Job ID, buyer name, address..."
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexShrink: 0,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={onToggleFilters}
        >
          Filters
        </Button>

        {selectedCount > 0 && (
          <Button
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={onUpdateStatus}
          >
            Update Status ({selectedCount})
          </Button>
        )}

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddJob}
        >
          Add Delivery Job
        </Button>
      </Stack>
    </Stack>
  );
}