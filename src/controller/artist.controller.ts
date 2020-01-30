import { ArtistService } from '../services/artist.service';
import { Application, Router } from 'express';
import { commonController } from '../core/common.controller';
import express from 'express';
import multer from 'multer';
import { env } from '../core/environnement';
import jwt from 'express-jwt';

const app = express();
// Le controller vous servira à réceptionner les requêtes associées aux Artists
// @param app l'application express

export const ArtistController = (app: Application) => {
  let router = Router();
  const service = new ArtistService();

  const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
      cb(null, env.uploadFolder + '/');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg' );
    },
  });
  const upload = multer({ storage,
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg)$/)) {
        return cb(new Error('Seul les formats jpg sont acceptés'), false);
      }
      cb(null, true);
    },
  });

  router.post('/file', upload.single('file'), async (req, res, next) => {
      const file = req.file;
      if (!file) {
        const error = new Error('Please upload a file');
        res.sendStatus(400);
        return next(error);
      }
      console.log(req.file);
      // const document = new Document();
      req.body.link = req.file.filename;
      const result = await service.create(req.body);
      res.send(result);
  });

  router = commonController(app, service, router);
  app.use('/artist', router);
};
