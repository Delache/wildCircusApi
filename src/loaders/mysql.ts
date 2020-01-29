import mysql from 'mysql';
import { DbHandler } from '../repository/db.handler';

export default async () => {

  const connexion = mysql.createConnection({
    host: process.env.WILD_API_DB_HOST,
    port: Number(process.env.WILD_API_DB_PORT),
    user: process.env.WILD_API_DB_USER,
    password: process.env.WILD_API_FUMAINERIE_DB_PASSWORD,
    database: 'baron_WildCircus',
    dateStrings: true,
  });

  DbHandler.getInstance(connexion);

  connexion.connect((err) => {
    if (err) { throw err; }
    console.log('Connected!');
  });

  return connexion;
};
