import { RepresentationService } from './../services/representation';
import { commonController } from '../core/common.controller';
import { Application, Router } from 'express';

export const RepresentationController = (app: Application) => {
    const service = new RepresentationService();
    let router = Router();

    router.get('/search/:word', async (req, res) => {
        const word = req.params.word;
        try {
            const result = await service.getBySearch(word);
            res.send(result);
        } catch (error) {
            res.status(404).send('La recherche n\'a rien donné');
        }
  });

    router = commonController(app, service, router);
    app.use('/representations', router);
};
