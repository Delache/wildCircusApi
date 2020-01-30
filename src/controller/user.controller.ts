import { UserService } from './../services/user.service';
import { Application, Router } from 'express';
import { commonController } from '../core/common.controller';
import jwt = require('express-jwt');

// Le controller vous servira à réceptionner les requêtes associées aux utilisateurs
// @param app l'application express

export const UserController = (app: Application) => {
    const service = new UserService();
    let userRouter = Router();

    if (!process.env.WILD_JWT_SECRET) {
        throw new Error('Secret is not defined');
    }
    userRouter.use(jwt({secret: process.env.WILD_JWT_SECRET}));

    userRouter.get('/me', async (req, res) => {
        (req as any).user.password = 'null';
        const user = await service.getById((req as any).user.id);
        if (!user) {
            res.status(400).send('Aucun utilisateur trouvé pour ce token');
        }
        res.send(user);
    });
    userRouter = commonController(app, service, userRouter);
    app.use('/users', userRouter);
};
