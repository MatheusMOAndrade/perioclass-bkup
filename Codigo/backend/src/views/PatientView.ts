import { AddressRaw } from "./AddressView";

export interface PatientView {
    id: number,
    name: string,
    email: string,
    birthDate: Date,
    gender: Gender,
    createdBy: number,
    createdAt: string,
    updatedAt: string,
}

export interface PatientRaw {
    id: number,
    name: string,
    email: string,
    birth_date: Date,
    gender: Gender,
    created_by: number,
    created_at: string,
    updated_at: string,
}

export interface PatientResponse {
    id: number,
    name: string,
    email: string,
    birthDate: Date,
    gender: Gender,
    state: string,
    city: string,
    district: string,
    country: string,
    createdBy: number,
    createdAt: string,
    updatedAt: string,
}

export function processPatient(raw: PatientRaw): PatientView {
    return {
        id: raw.id,
        name: raw.name,
        email: raw.email,
        birthDate: raw.birth_date,
        gender: raw.gender,
        createdBy: raw.created_by,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
    };
}

export function processPatientResponse(raw: PatientRaw, address: AddressRaw): PatientResponse {
    return {
        id: raw.id,
        name: raw.name,
        email: raw.email,
        state: address.state,
        city: address.city,
        district: address.district,
        country: address.country,
        birthDate: raw.birth_date,
        gender: raw.gender,
        createdBy: raw.created_by,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
    };
}

export function PatientProperties() {
    return {
        required: [
            "name",
            "birth_date",
            "gender"
        ],
        optional: [
            "id",
            "email",
        ],
    }
}

export function getPatientAge(birthDate: Date) {
    const now = new Date();
    const birth = new Date(birthDate);

    return parseInt(`${(now.getFullYear() - birth.getFullYear())}`);
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}
