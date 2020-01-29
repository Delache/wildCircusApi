import { AuthService } from '../services/auth.service';
import express, { Router, Request, Response, Application, response } from 'express';
import { User } from 'src/models/user';
import { env } from '../core/environnement';

// Le controller vous servira à réceptionner les requêtes associées aux utilisateurs
// @param app l'application express

export const AuthController = (app: Application) => {
    const authService = new AuthService();
    const authRouter: Router = express.Router();

    authRouter.post('/signup', async (req: Request, res: Response) => {
        const user = req.body;
        try {
            await authService.signUp(user);
            res.send('Record Ok');

        } catch (error) {
            res.status(409).send('Email déjà existant');
        }
    });

    authRouter.post('/signin', async (req: Request, res: Response) => {
        const userB: User = req.body ;
        try {
            const {token, user} = await authService.signIn(userB.email, userB.password);
            res.set('access-control-expose-headers', 'JWT-TOKEN');
            res.set('JWT-TOKEN', token); // renvoi du token dans le header, le user dans le body
            user.password = 'null';
            res.send(user);
        } catch (error) {
            if (error.message === 'NOT_ACTIVE') {
                res.status(409).send('Votre mail n\'a pas été validé');
            }
            res.status(409).send('Erreur dans la requete');
        }
    });

    authRouter.get('/confirmation/:token', async (req: Request, res: Response) => {
        const tokenStr = req.params.token;
        try {
            await authService.confirmation(tokenStr);
            res.redirect(env.url + '/connexion');
        } catch (error) {
            res.status(400).send('Lien invalide');
        }
    });

    app.use('/auth', authRouter);
};
