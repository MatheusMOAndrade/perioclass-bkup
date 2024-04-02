import { Request, Response, Router } from 'express';
import AnalyticsService from '../services/AnalyticsService';
import { authMiddleware } from '../modules/Midleware';


export const route = Router();
const Service = new AnalyticsService();

route.get('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const service = await Service.init();

        const response = {
            global: service.getReportPerGender(),
            perState: service.getReportPerState()
        }

        res.status(200).send(response);
    } catch (error) {
        res.status(error.status ?? 500).send(error.message);
    }
});
