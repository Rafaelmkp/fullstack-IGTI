import express from 'express';
import accountModel from '.././models/accountModel.js';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';

dotenv.config();

const { readFile } = fs;

const accRouter = express();

//INITIAL DATA CHARGE
//Should only be called once, to fill the db
accRouter.patch('/carregar-dados', async (req, res, next) => {
	try {
		const initialData = JSON.parse(await readFile(global.FILEACC));

		for (const account of initialData) {
			const newAcc = new accountModel(account);
			await newAcc.save();
		}

		res.send(initialData);
	} catch (err) {
		next(err);
	}
});

accRouter.use((err, _req, _res, _next) => {
	console.log(err.stack);
	res.status(500).send(`${err.message} - oh! this is awkward.`);
});

export default accRouter;
