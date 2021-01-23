import express from 'express';
import { promises as fs } from 'fs';
import gradesRouter from './routes/grades.js';
import swaggerUi from 'swagger-ui-express';
import winston from 'winston';

global.fileGrades = './grades.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-grades-api.log' }),
  ],
  format: combine(label({ label: 'my-grades-api' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use('/grades', gradesRouter);

app.listen(3000, () => {
  console.log('API Started!');
});
