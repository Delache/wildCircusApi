
  import bodyParser from 'body-parser';
  import cors from 'cors';
  import express, { Application } from 'express';
  import { env } from '../core/environnement';
  import path from 'path';

  export default async ( app: Application) => {

    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const p = path.join(__dirname, '../../' + env.uploadFolder);
    app.use('/uploads', express.static(p));

    // ...More middlewares

    // Return the express app
    return app;
  };
