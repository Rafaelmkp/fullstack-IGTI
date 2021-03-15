import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
// app.use();

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
		console.log('Conectado ao MONGODB');
	} catch (err) {
		console.log('Erro ao conectar');
		console.log(`${process.env.USERDB} - ${process.env.PWDDB}`);
	}
})();

app.listen(3000, () => console.log('API Iniciada'));
