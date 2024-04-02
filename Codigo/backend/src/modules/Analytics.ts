import { AppointmentView } from "../views/AppointmenView";
import { AddressView } from "../views/AddressView";
import { Gender, PatientView } from "../views/PatientView";
import { Grades } from "./Grade";
import { AccessView } from "../views/AccessView";
import { Appointment } from "./Appointment";
import { Stages } from "./Stage";
import { states } from "../views/AnalyticsView";

export class Analytics {
    private appointments: AppointmentView[];
    private patients: PatientView[] | null;
    private addresses: AddressView[] | null;
    private app = new Appointment();

    constructor(appointments: AppointmentView[], patients: PatientView[] = null, addresses: AddressView[] = null) {
        this.appointments = appointments;
        this.patients = patients;
        this.addresses = addresses;
    }

    filterByState(state: string): AppointmentView[] {
        if (!this.addresses) {
            return this.appointments;
        }
        return this.appointments.filter(appointment => {
            const address = this.addresses.find(a => a.patientId === appointment.patientId);
            return address.state === state;
        });
    }

    filterByGender(gender: Gender): AppointmentView[] {
        if (!this.patients) {
            return this.appointments;
        }
        return this.appointments.filter(appointment => {
            const patient = this.patients.find(p => p.id === appointment.id);
            return patient.gender === gender;
        });
    }

    async filterByGrade(grade: Grades, access: AccessView) {
        return (await Promise.all(this.appointments.map(async (appointment) => {
            await this.app.buildAppointment(appointment.id, access);
            const result = this.app.getAppointmentResult();
            return result.grade === grade ? appointment : null;
        }))).filter(a => a !== null);
    }

    async filterByStage(stage: Stages, access: AccessView) {
        return (await Promise.all(this.appointments.map(async (appointment) => {
            await this.app.buildAppointment(appointment.id, access);
            const result = this.app.getAppointmentResult();
            return result.stage === stage ? appointment : null;
        }))).filter(a => a !== null);
    }

    async getResultsByStates() {
        states.reduce((acc, state) => {
            const appByState = this.filterByState(state);



            return acc;
        }, {});
    }

}
