import mysql from 'mysql';
import { DbHandler } from '../repository/db.handler';

export default async () => {

  const connexion = mysql.createConnection({
    host: process.env.cp4_host,
    port: Number(process.env.cp4_port),
    user: 'root',
    password: process.env.secret,
    database: 'CP4',
    dateStrings: true,
  });

  DbHandler.getInstance(connexion);

  connexion.connect((err) => {
    if (err) { throw err; }
    console.log('Connected!');
  });

  return connexion;
};
