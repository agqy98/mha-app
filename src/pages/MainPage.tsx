import {
    useMemo,
    useState,
} from "react";

import type {
    GridRowSelectionModel,
} from "@mui/x-data-grid";

import jobsData from "../data/jobs.json";
import senderCompaniesData
    from "../data/senderCompanies.json";

import type { Job } from "../types/Job";
import type {
    SenderCompany,
} from "../types/SenderCompany";

import type {
    JobFilters,
    NewJobInput,
} from "../features/jobs/types";

import JobsToolbar
    from "../features/jobs/components/JobsToolbar";

import JobsFilterBar
    from "../features/jobs/components/JobsFilterBar";

import JobList
    from "../features/jobs/components/JobList";

import AddJobDialog
    from "../features/jobs/components/AddJobDialog";

import UpdateStatusDialog
    from "../features/jobs/components/UpdateStatusDialog";

const initialFilters: JobFilters = {
    status: "",
    senderCompanyId: "",
    parcelType: "",
    deliveryDate: "",
};

export default function MainPage() {
    const [jobs, setJobs] =
        useState<Job[]>(
            jobsData as Job[]
        );

    const senderCompanies =
        senderCompaniesData as SenderCompany[];

    const [search, setSearch] =
        useState("");

    const [filters, setFilters] =
        useState<JobFilters>(
            initialFilters
        );

    const [showFilters, setShowFilters] =
        useState(true);

    const [
        addDialogOpen,
        setAddDialogOpen,
    ] = useState(false);

    const [
        statusDialogOpen,
        setStatusDialogOpen,
    ] = useState(false);

    const [
        selectionModel,
        setSelectionModel,
    ] =
        useState<GridRowSelectionModel>({
            type: "include",
            ids: new Set(),
        });

    const filteredJobs = useMemo(() => {
        const searchValue =
            search.toLowerCase().trim();

        return jobs.filter((job) => {
            const fullAddress = [
                job.buyerAddress.address,
                job.buyerAddress.unit,
                job.buyerAddress.postalCode,
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                !searchValue ||
                job.id
                    .toLowerCase()
                    .includes(searchValue) ||
                job.buyerName
                    .toLowerCase()
                    .includes(searchValue) ||
                fullAddress.includes(searchValue);

            const matchesStatus =
                !filters.status ||
                job.status === filters.status;

            const matchesCompany =
                !filters.senderCompanyId ||
                job.senderCompanyId ===
                filters.senderCompanyId;

            const matchesParcelType =
                !filters.parcelType ||
                job.parcelType ===
                filters.parcelType;

            const matchesDate =
                !filters.deliveryDate ||
                job.deliveryDate ===
                filters.deliveryDate;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCompany &&
                matchesParcelType &&
                matchesDate
            );
        });
    }, [
        jobs,
        search,
        filters,
    ]);

    const handleAddJob = (
        input: NewJobInput
    ) => {
        const nextNumber =
            Math.max(
                ...jobs.map((job) =>
                    Number(
                        job.id.replace("JOB-", "")
                    )
                )
            ) + 1;

        const newJob: Job = {
            ...input,

            id: `JOB-${nextNumber}`,

            status: "Pending",

            createdAt:
                new Date().toISOString(),
        };

        setJobs((current) => [
            ...current,
            newJob,
        ]);
    };

    const handleUpdateJob = (
        jobId: string,
        values: NewJobInput
    ) => {
        setJobs((currentJobs) =>
            currentJobs.map((job) =>
                job.id === jobId
                    ? {
                        ...job,

                        ...values,

                        buyerAddress: {
                            ...values.buyerAddress,
                        },
                    }
                    : job
            )
        );
    };

    const handleUpdateStatus = (
        status: Job["status"]
    ) => {
        const selectedIds =
            selectionModel.ids;

        setJobs((current) =>
            current.map((job) =>
                selectedIds.has(job.id)
                    ? {
                        ...job,
                        status,
                    }
                    : job
            )
        );

        setSelectionModel({
            type: "include",
            ids: new Set(),
        });
    };

    return (
        <>
            <JobsToolbar
                search={search}
                selectedCount={
                    selectionModel.ids.size
                }
                onSearchChange={setSearch}
                onToggleFilters={() =>
                    setShowFilters(
                        (current) => !current
                    )
                }
                onAddJob={() =>
                    setAddDialogOpen(true)
                }
                onUpdateStatus={() =>
                    setStatusDialogOpen(true)
                }
            />

            {showFilters && (
                <JobsFilterBar
                    filters={filters}
                    senderCompanies={
                        senderCompanies
                    }
                    onChange={setFilters}
                    onClear={() =>
                        setFilters(initialFilters)
                    }
                />
            )}

            <JobList
                jobs={filteredJobs}
                senderCompanies={
                    senderCompanies
                }
                selectionModel={
                    selectionModel
                }
                onSelectionChange={
                    setSelectionModel
                }
                onUpdateJob={
                    handleUpdateJob
                }
            />

            <AddJobDialog
                open={addDialogOpen}
                senderCompanies={
                    senderCompanies
                }
                onClose={() =>
                    setAddDialogOpen(false)
                }
                onAdd={handleAddJob}
            />

            <UpdateStatusDialog
                open={statusDialogOpen}
                selectedCount={
                    selectionModel.ids.size
                }
                onClose={() =>
                    setStatusDialogOpen(false)
                }
                onUpdate={
                    handleUpdateStatus
                }
            />
        </>
    );
}