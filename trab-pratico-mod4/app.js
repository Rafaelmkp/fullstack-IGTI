import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import accountModel from './models/accountModel.js';
import accRouter from './routes/accountsRouter.js';
import db from './models/index.js';

dotenv.config();

global.FILEACC = 'accounts-2.json';

(async () => {
  try {
    await mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('App conectado ao MONGODB');
  } catch (err) {
    console.log('App - erro ao conectar');
  }
})();

const app = express();
app.use(express.json());
app.use('/account', accRouter);
app.listen(process.env.PORT, () => console.log('API Iniciada'));
