import type { Address } from "./Address";

import {
    JOB_STATUSES,
    PARCEL_TYPES,
    PARCEL_SIZES,
} from "../features/jobs/constants/jobOptions";

export type JobStatus =
    (typeof JOB_STATUSES)[number];

export type ParcelType =
    (typeof PARCEL_TYPES)[number];

export type ParcelSize =
    (typeof PARCEL_SIZES)[number];

export interface Job {
    id: string;

    buyerName: string;
    buyerAddress: Address;
    contactNumber: string;

    senderCompanyId: string;

    parcelType: ParcelType;
    parcelSize: ParcelSize;

    status: JobStatus;
    deliveryDate: string;

    weightKg?: number;
    preferredTime?: string;
    deliveryOption?: string;
    notes?: string;

    createdAt: string;
}