// This is a shared file 

import type { Address } from "../../types/Address";
import type {
  JobStatus,
  ParcelSize,
  ParcelType,
} from "../../types/Job";

export interface JobFilters {
  status: JobStatus | "";
  senderCompanyId: string;
  parcelType: ParcelType | "";
  deliveryDate: string;
}

export interface NewJobInput {
  buyerName: string;
  buyerAddress: Address;
  contactNumber: string;

  senderCompanyId: string;

  parcelType: ParcelType;
  parcelSize: ParcelSize;

  deliveryDate: string;
  notes?: string;
}