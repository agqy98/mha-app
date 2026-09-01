export const JOB_STATUSES = [
    "Pending",
    "In Transit",
    "Delivered",
] as const;

export const PARCEL_TYPES = [
    "Document",
    "Box",
] as const;

export const PARCEL_SIZES = [
    "Small",
    "Medium",
    "Large",
] as const;

export const DELIVERY_OPTIONS = [
    "Door-to-Door",
    "Drop-off Point",
] as const;

export const PREFERRED_TIMES = [
    "09:00 - 13:00",
    "14:00 - 18:00",
    "18:00 - 21:00",
] as const;