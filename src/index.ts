
import express from 'express';
import loaders from './loaders';

import { UserController } from './controller/user.controller';
import { AuthController } from './controller/auth.controller';
import { DocumentController } from './controller/document.controller';
import { PriceController } from './controller/price.controller';

async function startServer() {
  // Récupération de l'application initiale
  const app = express();
  // Chargement des différents loader
  await loaders(app);

  // Ajout des différentes route de votre application
  UserController(app);
  AuthController(app);
  DocumentController(app);
  PriceController(app );

  // Démarrage du serveur une fois que tout est correctement init
  app.listen(3000, () => console.log('Express server is running'));
}

startServer();
