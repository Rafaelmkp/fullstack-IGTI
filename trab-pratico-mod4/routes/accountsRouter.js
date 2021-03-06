import express from 'express';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import * as accController from '../controllers/accountController.js';

dotenv.config();

const { readFile } = fs;

const accRouter = express.Router();

//INITIAL DATA CHARGE
//Should only be called once, to fill the db
accRouter.patch('/carregar-dados', accController.loadData);

accRouter.use((err, _req, _res, _next) => {
  console.log(err.stack);
  res.status(500).send(`${err.message} - oh! this is awkward.`);
});

export default accRouter;
