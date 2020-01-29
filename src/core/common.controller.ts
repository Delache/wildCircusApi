import { Application, Router, Request, Response } from 'express';
import { AbstractService } from './abstract.service';

export const commonController = (app: Application, service: AbstractService<any>, abstractRouter = Router()) => {

    abstractRouter.get('/', async (req: Request, res: Response) => {
        try {
            const result = await service.getAll();
            res.send(result);
        } catch (error) {
            res.status(404).send('Récupération impossible');
        }
    });

    abstractRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        try {
            const result = await service.getById(id);
            res.send(result);
        } catch (error) {
            res.status(404).send('Récupération via id impossible');
        }
    });

    abstractRouter.put('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const element = req.body;
        try {
           const result = await service.modifyElement(element, id );
           res.send(result);
        } catch (error) {
            res.status(404).send('Error');
        }
    });

    abstractRouter.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        try {
            service.deleteElement(id);
            res.send();
        } catch (error) {
            res.status(404).send('Error');
        }
    });

    abstractRouter.post('/', (req: Request, res: Response) => {
        const element = req.body;
        try {
            service.upload(element);
            res.send(element);
        } catch (error) {
            res.status(404).send('Erreur');
        }
    });

    return abstractRouter;
};
