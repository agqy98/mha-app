import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import { Edit as EditIcon } from "@mui/icons-material";

import {
  DataGrid,
  GridActionsCell,
  GridActionsCellItem,
  type GridColDef,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";

import type { Job } from "../../../types/Job";
import type { SenderCompany } from "../../../types/SenderCompany";

import JobStatusChip from "./JobStatusChip";
import EditJobDialog from "./EditJobDialog";
import type { NewJobInput } from "../types";

interface JobListProps {
  jobs: Job[];
  senderCompanies: SenderCompany[];

  selectionModel: GridRowSelectionModel;

  onSelectionChange:
  (selection: GridRowSelectionModel) => void;

  onUpdateJob: (
    jobId: string,
    values: NewJobInput
  ) => void;
}

export default function JobList({
  jobs,
  senderCompanies,
  selectionModel,
  onSelectionChange,
  onUpdateJob,
}: JobListProps) {
  const navigate = useNavigate();

  const [editingJob, setEditingJob] =
    useState<Job | null>(null);

  const companyMap = useMemo(
    () =>
      new Map(
        senderCompanies.map((company) => [
          company.id,
          company.name,
        ])
      ),
    [senderCompanies]
  );

  const columns = useMemo<GridColDef<Job>[]>(
    () => [
      {
        field: "actions",
        type: "actions",
        headerName: "",
        width: 50,
        sortable: false,
        filterable: false,

        renderCell: (params) => (
          <GridActionsCell {...params}>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit job"
              onClick={() =>
                setEditingJob(
                  params.row
                )
              }
            />
          </GridActionsCell>
        ),
      },
      // {
      //   field: "id",
      //   headerName: "Job ID",
      //   width: 120,
      // },

      {
        field: "buyerName",
        headerName: "Buyer",
        width: 160,
      },

      {
        field: "buyerAddress",
        headerName: "Buyer Address",
        minWidth: 280,
        flex: 1,
        sortable: false,

        valueGetter: (_value, row) => {
          const {
            address,
            unit,
            postalCode,
          } = row.buyerAddress;

          return [
            address,
            unit,
            `Singapore ${postalCode}`,
          ]
            .filter(Boolean)
            .join(", ");
        },
      },

      {
        field: "status",
        headerName: "Status",
        width: 130,

        renderCell: (params) => (
          <JobStatusChip
            status={params.row.status}
          />
        ),
      },

      {
        field: "deliveryDate",
        headerName: "Delivery Date",
        width: 150,
      },

      {
        field: "senderCompanyId",
        headerName: "Sender Company",
        width: 160,

        valueGetter: (value) =>
          companyMap.get(value) ?? value,
      },

      {
        field: "parcelType",
        headerName: "Parcel Type",
        width: 130,
      },
    ],
    [companyMap, navigate]
  );

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <DataGrid
        rows={jobs}
        columns={columns}

        checkboxSelection
        disableRowSelectionOnClick

        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={
          onSelectionChange
        }

        // Keeps selection easier to manage:
        // always explicit selected IDs.
        disableRowSelectionExcludeModel

        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5,
            },
          },
        }}

        pageSizeOptions={[5, 10]}

        sx={{
          border: 0,
          minHeight: 400,
        }}
      />
      <EditJobDialog
        open={
          editingJob !== null
        }

        job={
          editingJob
        }

        senderCompanies={
          senderCompanies
        }

        onClose={() =>
          setEditingJob(null)
        }

        onSave={
          onUpdateJob
        }
      />
    </Paper>
  );
}