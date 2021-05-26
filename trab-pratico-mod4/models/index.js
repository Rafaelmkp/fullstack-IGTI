import mongoose from 'mongoose';
import accountModel from './accountModel.js';

const db = {};

db.url =
  'mongodb+srv://' +
  process.env.USERDB +
  ':' +
  process.env.PWDDB +
  '@cluster0.ktzob.mongodb.net/accounts?retryWrites=true&w=majority';
db.mongoose = mongoose;
db.account = accountModel(mongoose);

global.BANK_WITHDRAW_TAX = 1;
global.BANK_TRANSFER_TAX = 8;

export { db };
