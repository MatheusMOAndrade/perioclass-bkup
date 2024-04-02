import { Request, Response, Router } from 'express';
import GenericService from '../services/GenericService';
import { authMiddleware } from '../modules/Midleware';
import { TablesNames } from '../views/QueryBuildView';
import { AppointmentRaw, processAppointment } from '../views/AppointmenView';
import { Appointment, AppointmentResult } from '../modules/Appointment';
import { PatientRaw, getPatientAge } from '../views/PatientView';
import AnalyticsService from '../services/AnalyticsService';
import { AccessView } from '../views/AccessView';
import { AnalyticsPost, AnalyticsRaw } from '../views/AnalyticsView';
import { AddressRaw } from '../views/AddressView';

export const route = Router();
const service = new GenericService();
const analyticsService = new AnalyticsService();
const appointment = new Appointment();

route.get('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const rawAppointments = await service.select<AppointmentRaw[]>(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.APPOINTMENTS,
            req.query
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        const patients = await service.select<PatientRaw[]>(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.PATIENTS,
            {}
        )

        if (!rawAppointments) {
            return;
        }

        const appointments = rawAppointments.map(appointment => {
            const patient = patients.find(p => p.id === appointment.patient_id);
            return { ...processAppointment(appointment), name: patient.name }
        });

        res.status(200).send(appointments);
    } catch (error) {
        res.status(error.status ?? 500).send(error.message);
    }
});

route.get('/result', authMiddleware, async (req: Request, res: Response) => {
    try {
        const appointmentId = Number(req.query.id);

        if (!req.query.id) {
            res.status(400).send("Id da consulta é obrigatório, passe-o na query.");
            return;
        }

        await appointment.buildAppointment(appointmentId, {
            userId: req.sessionID,
            level: Number(req.headers.authorization)
        });

        res.status(200).send(appointment.getAppointmentResult());
    } catch (error) {
        res.status(error.status ?? 500).send(error.message);
    }

});

route.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        let err = null;

        const access = {
            userId: req.sessionID,
            level: Number(req.headers.authorization)
        }

        const insertion = await service.create(
            access,
            TablesNames.APPOINTMENTS,
            req.body
        ).catch(error => {
            err = error;
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (err) {
            return;
        }

        const patient = (await service.select<PatientRaw[]>({
            userId: req.sessionID,
            level: Number(req.headers.authorization)
        }, TablesNames.PATIENTS, { id: Number(req.body.patient_id) }))[0];

        const addresses = (await service.select<AddressRaw[]>(
            access,
            TablesNames.ADDRESSES,
            { patient_id: Number(req.body.patient_id) }
        ))[0];

        const insertedId = (await service.getLastInsertedItem(TablesNames.APPOINTMENTS, req.sessionID))[0].id;

        await appointment.buildAppointment(insertedId, access);
        const result = appointment.getAppointmentResult();

        managePostData(access, {
            patient_age: getPatientAge(new Date(patient.birth_date)),
            patient_gender: patient.gender,
            state: addresses.state,
            country: addresses.country,
            grade: result.grade,
            stage: result.stage,
        });

        if (insertion) {
            res.status(200).send({ message: "Consulta criada com sucesso.", id: insertedId, result: result });
        } else {
            res.status(401).send("Você não possui permissão para adicionar consultas.");
        }
    } catch (error) {
        res.status(error.status ?? 500).send(error.message);
    }
});

route.put('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        if (!req.query.id) {
            return res.status(400).send("O ID do usuário precisar ser passado como parâmetro na query.");
        }
        const update = await service.update(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.APPOINTMENTS,
            Number(req.query.id),
            req.body
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (!update) {
            return;
        }

        if (update.affectedRows > 0) {
            res.status(200).send("Consulta atualizada com sucesso.");
        } else {
            res.status(401).send("A consulta solicitada não foi encontrada.");
        }
    } catch (error) {
        res.status(error.status ?? 500).send(error.message);
    }
});

route.delete('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        if (!req.query.id) {
            return res.status(400).send("O ID do usuário precisar ser passado como parâmetro na query.");
        }
        const update = await service.remove(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.APPOINTMENTS,
            Number(req.query.id)
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (!update) {
            return;
        }

        if (update.affectedRows > 0) {
            res.status(200).send("Consulta removida com sucesso.");
        } else {
            res.status(401).send("A consulta solicitada não foi encontrada.");
        }
    } catch (error) {
        res.status(error.status ?? 500).send(error.message);
    }
});

function managePostData(access: AccessView, data: AnalyticsPost) {
    try {
        analyticsService.addData(access, data);
    } catch (error) {
        throw error;
    }
};