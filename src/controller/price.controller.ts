import {PriceService } from './../services/price.service';
import { Application, Router } from 'express';
import { commonController } from '../core/common.controller';

export const PriceController = (app: Application) => {
    const service = new PriceService();
    let router = Router();
    router = commonController(app, service, router);
    app.use('/prices', router);
};
