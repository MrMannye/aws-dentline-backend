import axios from 'axios';

export interface CoDiConfig {
	merchantId: string;
	apiKey: string;
	amount: number;
	description: string;
	customerName: string;
	customerEmail: string;
	paymentAccount: string;
}

export async function generateCoDiQR(config: CoDiConfig): Promise<string> {
	const url = `https://sandbox-api.openpay.mx/v1/${config.merchantId}/charges`;

	const data = {
		method: 'codi',
		amount: config.amount,
		description: config.description,
		customer: {
			name: config.customerName,
			email: config.customerEmail,
		},
		codi: {
			payment_account: config.paymentAccount,
		},
	};

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Basic ${Buffer.from(config.apiKey).toString('base64')}`,
	};

	try {
		const response = await axios.post(url, data, { headers });
		return response.data.payment_method.qr_code_url;
	} catch (error) {
		console.error('Error generating CoDi QR code:', error);
		throw new Error('Failed to generate CoDi QR code');
	}
}

