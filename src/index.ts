import express from 'express'
import dentistRouter from './components/dentist/router'
import pacientsRouter from './components/pacients/router'
import datesRouter from './components/dates/router'
import dotenv from 'dotenv'
import cors from 'cors'
import QRCode from 'qrcode'
import { generateCoDiQR, CoDiConfig } from '../src/codi';

// // Example usage
const config: CoDiConfig = {
	merchantId: 'm41gtvnw30rgf7gzim9b',
	apiKey: 'sk_fdb448c5a04d449695ef6bbf52156d52',
	amount: 100.0,
	description: 'Payment for services',
	customerName: 'Miguel Aguilera',
	customerEmail: 'john.doe@example.com',
	paymentAccount: '638180010182916776',
};

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))


app.use('/dentist', dentistRouter)
app.use('/pacients', pacientsRouter);
app.use('/dates', datesRouter);

// Ruta para generar el QR CoDi dinámico
app.get('/', (_req, res) => {
	generateCoDiQR(config)
		.then((qrCodeUrl) => {
			QRCode.toDataURL(qrCodeUrl, (err, url) => {
				if (err) {
					console.error('Error generating QR code:', err);
					res.status(500).send('Failed to generate QR code');
				} else {
					res.send(`<img src="${url}" alt="QR Code" />`);
				}
			});
		})
		.catch(() => {
			res.status(500).send('Failed to generate CoDi QR code');
		});
});



app.listen(5000, () => {
	console.log('Server is running on port 5000')
})