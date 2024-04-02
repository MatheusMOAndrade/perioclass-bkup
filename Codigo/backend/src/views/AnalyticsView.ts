import { Grades } from "../modules/Grade";
import { Stages } from "../modules/Stage";
import { Gender } from "./PatientView";

export interface AnalyticsView {
    id: number;
    patientAge: number;
    patientGender: string;
    state: string;
    country: string;
    grade: Grades;
    stage: Stages;
    createdBy: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface AnalyticsPost {
    patient_age: number;
    patient_gender: string;
    state: string;
    country: string;
    grade: Grades;
    stage: Stages;
}

export interface AnalyticsRaw extends AnalyticsPost {
    id: number;
    created_by: number;
    created_at: Date;
    updated_at: Date;
}

export function processAnalytics(analytics: AnalyticsRaw): AnalyticsView {
    return {
        id: analytics.id,
        patientAge: analytics.patient_age,
        patientGender: analytics.patient_gender,
        state: analytics.state,
        country: analytics.country,
        grade: analytics.grade,
        stage: analytics.stage,
        createdBy: analytics.created_by,
        createdAt: analytics.created_at,
        updatedAt: analytics.updated_at,
    }
}

export function analyticsProperties() {
    return {
        required: [
            "patient_age",
            "patient_gender",
            "state",
            "country",
            "grade",
            "stage",
        ],
        optional: [
            "id",
            "created_by"
        ]
    }
}

export interface AnalyticsFilters {
    state?: string;
    country?: string;
    age?: number;
    gender?: Gender;
    grade?: Grades;
    stage?: Stages;
}

export const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO"
]
