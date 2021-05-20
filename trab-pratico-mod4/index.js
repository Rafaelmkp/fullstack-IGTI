import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import accRouter from './routes/accountsRouter.js';

dotenv.config();

global.FILEACC = 'accounts-2.json';

const uri =
  'mongodb+srv://' +
  process.env.USERDB +
  ':' +
  process.env.PWDDB +
  '@cluster0.ktzob.mongodb.net/accounts?retryWrites=true&w=majority';

(async () => {
  try {
    await mongoose.connect(uri, {
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
