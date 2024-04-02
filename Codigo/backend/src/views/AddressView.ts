export interface AddressView {
    id: number,
    patientId: number,
    state: string,
    city: string,
    district: string,
    country: string,
    createdBy: number,
    createdAt: string,
    updatedAt: string,
}

export interface AddressRaw {
    id: number,
    patient_id: number,
    state: string,
    city: string,
    district: string,
    country: string,
    created_by: number,
    created_at: string,
    updated_at: string,
}

export function processAddress(raw: AddressRaw): AddressView {
    return {
        id: raw.id,
        patientId: raw.patient_id,
        state: raw.state,
        city: raw.city,
        district: raw.district,
        country: raw.country,
        createdBy: raw.created_by,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
    };
}

export function AddressProperties() {
    return {
        required: [
            "patient_id",
            "state",
            "country"
        ],
        optional: [
            "id",
            "district",
            "city",
        ]
    }
}
