import GenericService from "../services/GenericService";
import { AccessView } from "../views/AccessView";
import { AppointmentRaw } from "../views/AppointmenView";
import { PatientRaw, getPatientAge } from "../views/PatientView";
import { TablesNames } from "../views/QueryBuildView";
import { RequestException } from "../views/RequestExceptionView";
import { Grade, Grades } from "./Grade";
import { Stage, Stages } from "./Stage";

const service = new GenericService();

export interface AppointmentResult {
    stage: Stages;
    grade: Grades;
}

export class Appointment {
    stage: Stage;
    grade: Grade;

    buildAppointment = async (appointmentId: number, access: AccessView) => {
        try {
            await this.getAppointmentData(appointmentId, access);
        } catch (error) {
            throw error;
        }
    }

    getAppointmentResult = (): AppointmentResult => ({
        stage: this.stage.defineStage(),
        grade: this.grade.defineGrade()
    })

    private getAppointmentData = async (appointmentId: number, access: AccessView) => {
        try {
            const rawAppointment = (await service.select<AppointmentRaw[]>(
                access,
                TablesNames.APPOINTMENTS,
                { id: appointmentId }
            ))[0];

            if (!rawAppointment) {
                throw { message: "Erro ao buscar consulta", status: 404 } as RequestException
            }

            const rawPatient = (await service.select<PatientRaw[]>(
                access,
                TablesNames.PATIENTS,
                { id: rawAppointment.patient_id }
            ))[0];

            this.stage = new Stage(
                rawAppointment.tooth_loss,
                rawAppointment.interdental_cal_loss,
                rawAppointment.bone_loss,
                rawAppointment.bone_lenght,
                rawAppointment.maximum_probing_depth,
                rawAppointment.bone_loss_type,
                rawAppointment.furcation
            );

            this.grade = new Grade(
                rawAppointment.smoking,
                rawAppointment.hemoglobine_glycated,
                rawAppointment.loss_historical_in_five_years,
                (rawAppointment.bone_loss / rawAppointment.bone_lenght) / getPatientAge(rawPatient.birth_date)
            );
        } catch (error) {
            throw error
        }
    }
}
