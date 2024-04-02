export interface AppointmentView {
    id: number;
    toothLoss: number;
    interdentalCalLoss: number;
    maximumProbingDepth: number;
    furcation: Furcation;
    boneLenght: number;
    boneLoss: number;
    boneLossType: BoneLossType;
    smoking: Smoking;
    hemoglobineGlycated: HemoglobineGlycated;
    lossHistoricalInFiveYears: number;
    extension: Extension;
    textBox: string;
    biofilm: boolean;
    patientId: number;
    createdBy: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface AppointmentRaw {
    id: number;
    tooth_loss: number;
    interdental_cal_loss: number;
    maximum_probing_depth: number;
    furcation: Furcation;
    bone_lenght: number;
    bone_loss: number;
    bone_loss_type: BoneLossType;
    smoking: Smoking;
    hemoglobine_glycated: HemoglobineGlycated;
    loss_historical_in_five_years: number;
    extension: Extension;
    text_box: string;
    biofilm: boolean;
    patient_id: number;
    created_by: number;
    created_at: Date;
    updated_at: Date;
}

export interface AppointmentResponse {
    id: string;
    toothLoss: number;
    interdentalCalLoss: number;
    maximumProbingDepth: number;
    furcation: Furcation;
    boneLenght: number;
    boneLossType: BoneLossType;
    boneLossPercentage: number;
    smoking: Smoking;
    hemoglobineGlycated: HemoglobineGlycated;
    lossHistoricalInFiveYears: number;
    extension: Extension;
    textBox: string;
    biofilm: Biofilm;
    createdAt: number;
    updatedAt: string;
}

export function processAppointment(raw: AppointmentRaw): AppointmentView {
    return {
        id: raw.id,
        toothLoss: raw.tooth_loss,
        interdentalCalLoss: raw.interdental_cal_loss,
        maximumProbingDepth: raw.maximum_probing_depth,
        furcation: raw.furcation,
        boneLenght: raw.bone_lenght,
        boneLoss: raw.bone_loss,
        boneLossType: raw.bone_loss_type,
        smoking: raw.smoking,
        hemoglobineGlycated: raw.hemoglobine_glycated,
        lossHistoricalInFiveYears: raw.loss_historical_in_five_years,
        extension: raw.extension,
        textBox: raw.text_box,
        biofilm: raw.biofilm,
        patientId: raw.patient_id,
        createdBy: raw.created_by,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
    };
}

export function AppointmentProperties() {
    return {
        required: [
            "tooth_loss",
            "interdental_cal_loss",
            "maximum_probing_depth",
            "furcation",
            "bone_lenght",
            "bone_loss",
            "bone_loss_type",
            "smoking",
            "hemoglobine_glycated",
            "loss_historical_in_five_years",
            "extension",
            "patient_id",
        ],
        optional: [
            "text_box",
            "biofilm",
            "id"
        ]
    }
}

export enum Furcation {
    NONE = 'none',
    CLASS_1 = 'class1',
    CLASS_2 = 'class2',
    CLASS_3 = 'class3'
}

export enum BoneLossType {
    HORIZONTAL_BONE_LOSS = 'Mostly horizontal bone loss.',
    VERTICAL_BONE_LOSS = 'Vertical bone loss. (Bone loss ≥ 3mm)',
}

export enum Smoking {
    NO_SMOKER = '0',
    LESS_THAN_TEN = '<10',
    TEN_OR_MORE = '>=10'
}

export enum HemoglobineGlycated {
    NO_DIABETIC = '0',
    LESS_THAN_SEVEN = '<7%',
    SEVEN_OR_MORE = '>=7%'
}

export enum Extension {
    LESS_THAN_THIRTY = '<30%',
    THIRTY_OR_GREATER = '>=30%',
    MOLAR_INCISIVE = 'molar/incisive'
}

export enum Biofilm {
    COMPATIBLE = 'compatible',
    INCOMPATIBLE = 'incompatible'
}
