import { Request, Response, Router } from 'express';
import GenericService from '../services/GenericService';
import { authMiddleware } from '../modules/Midleware';
import { TablesNames } from '../views/QueryBuildView';
import { PatientRaw, processPatient, processPatientResponse } from '../views/PatientView';
import { AddressRaw } from '../views/AddressView';
import { RequestException } from '../views/RequestExceptionView';

export const route = Router();
const service = new GenericService();

route.get('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const rawPatients = await service.select<PatientRaw[]>(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.PATIENTS,
            req.query
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (!rawPatients) {
            return;
        }

        const rawAddresses = await service.select<AddressRaw[]>(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.ADDRESSES,
            {}
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (!rawAddresses) {
            return;
        }

        const patients = rawPatients.map(patient => {
            const patientAddress = rawAddresses.find(address => address.patient_id == patient.id);
            if (!!patientAddress) {
                return processPatientResponse(patient, patientAddress);
            } else {
                return processPatient(patient);
            }
        });

        res.status(200).send(patients);
    } catch (error) {
        res.status(error.status ?? 500).send(error.message);
    }
});

route.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        let addressBody = { ...req.body };
        const insertion = await service.create(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.PATIENTS,
            req.body
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (!insertion) {
            return;
        }

        const insertedId = await service.getLastInsertedItem(TablesNames.PATIENTS, req.sessionID);

        addressBody.patient_id = insertedId[0].id;
        const addressInsertion = await service.create(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.ADDRESSES,
            addressBody
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (!!addressInsertion) {
            res.status(200).send({ message: "Paciente criado com sucesso.", id: insertedId[0].id });
        } else {
            return
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
        const addressBody = { ...req.body };

        const update = await service.update(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.PATIENTS,
            Number(req.query.id),
            req.body
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (!update) {
            return;
        }

        const address = await service.select<AddressRaw[]>(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.ADDRESSES,
            { patient_id: String(req.query.id) }
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (!address) return;

        const addressUpdate = await service.update(
            {
                userId: req.sessionID,
                level: Number(req.headers.authorization)
            },
            TablesNames.ADDRESSES,
            address[0].id,
            addressBody
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (!addressUpdate) {
            return;
        }

        if (update.affectedRows > 0 && addressUpdate.affectedRows > 0) {
            res.status(200).send("Paciente atualizado com sucesso.");
        } else {
            res.status(404).send("O paciente solicitado não foi encontrado.");
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
            TablesNames.PATIENTS,
            Number(req.query.id)
        ).catch(error => {
            res.status(error.status ?? 500).send(error.sqlMessage);
        });

        if (!update) {
            return;
        }

        if (update.affectedRows > 0) {
            res.status(200).send("Paciente removido com sucesso.");
        } else {
            res.status(404).send("O paciente solicitado não foi encontrado.");
        }
    } catch (error) {
        res.status(error.status ?? 500).send(error.message);
    }
});
