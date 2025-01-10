import { CitaRecap } from "../../types"
import { getDateByIdDate } from "../pacients/database"
import { deleteDateById, getHoursDisableDB, putAbonoDB, putDateDB } from "./database"
import axios from "axios"

export const getHoursDisable = async (date: Date) => {
	try {
		const allHours = await getHoursDisableDB(date)
		return allHours
	} catch (error) {
		console.log('getHoursDisable function called');
		console.log('putAbono function called');
		console.log('putDate function called');
		console.log('convertirFechaPersonalizada function called');
		console.log('getTokenSMS function called');
		console.log('sendSMS function called');

		return error
	}
}

export const putAbono = async (body: any) => {
	try {
		// Primero, obtén los valores actuales de la cita
		const rows: any = await getDateByIdDate(body.id_cita);
		const cita = rows[0] as CitaRecap;

		const abono = parseFloat(body.abono);
		// Verifica si el nuevo abono excedería el costo total
		if (cita.abono + abono > cita.costo_total) {
			throw new Error("El abono no puede exceder el costo total");
		}
		const result: any = await putAbonoDB(body.abono, body.id_cita)
		result.message = {
			response: result.affectedRows ? "Abono actualizado" : "No se pudo actualizar el abono",
			isAbonoEqualCosto: (cita.abono + abono) === cita.costo_total
		}
		return result
	} catch (error) {
		return error
	}
}

interface PutDate {
	id_cita: string
	fecha_cita: string
	numero_paciente: string
	abono: string
}

export const putDate = async ({ id_cita, fecha_cita, numero_paciente, abono }: PutDate) => {
	try {
		console.log(id_cita, fecha_cita, numero_paciente, abono)
		const result: any = await putDateDB(id_cita, fecha_cita)
		// if (result.affectedRows) {
		// 	await sendSMS(id_cita, numero_paciente, abono, fecha_cita)
		// }
		return result
	} catch (error) {
		return error
	}
}

function convertirFechaPersonalizada(fechaString: string) {
	// Convertir el string a un objeto Date
	const [fecha, hora] = fechaString.split(" ");
	const [anio, mes, dia] = fecha.split("-").map(Number);
	const [hora24, minutos] = hora.split(":").map(Number);

	// Crear nombres de meses
	const meses = [
		"enero", "febrero", "marzo", "abril", "mayo", "junio",
		"julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
	];

	// Formato de hora AM/PM
	const hora12 = hora24 % 12 === 0 ? 12 : hora24 % 12; // Convertir a formato 12 horas
	const periodo = hora24 >= 12 ? "pm" : "am"; // Determinar si es AM o PM

	// Construir la fecha en formato personalizado
	return `${dia} de ${meses[mes - 1]} del ${anio} a las ${hora12}:${minutos.toString().padStart(2, '0')}${periodo}`;
}


export const getTokenSMS = async (): Promise<string | null> => {
	const url = 'https://api.webhooksms.com/authorization-endpoint/v1/api/get/token';
	const data = {
		apikey: 'T7hkUB5FPHqHHDl3QGdBah0/637t8DJjDB4L0PwhHVIphg6I7H3ENYebZtBwI/tu6Q/orzj8KAjEoc6IxC0Ulw==',
		secret: 'rBeWpZgimZsWMEzuOiDgbXXcMHpypTqIhTLuwlyFAMyG30gg39gI9zds4mPJz+Gdq+FrOdAR2CwQUM0Q4+tNng=='
	};

	try {
		const response = await axios.post(url, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		// Retornar el token obtenido
		return response.data.token;
	} catch (error) {
		console.error('Error al obtener el token:', error);
		return null; // En caso de error, retorna null
	}
}

export const sendSMS = async (id_cita: string, numero: string, abono: string, fecha_cita: string) => {
	const url = 'https://api.webhooksms.com/sms-template-endpoint/api/v1/sms/template/messaging';
	const jwtToken = await getTokenSMS();

	if (!jwtToken) {
		console.error('No se pudo obtener el token JWT');
		return;
	}

	let message = '';
	console.log(message, abono);
	// Datos que deseas enviar en el cuerpo de la solicitud
	const rows: any = await getDateByIdDate(id_cita);
	const cita = rows[0] as CitaRecap;

	// Verifica si el nuevo abono excedería el costo total
	if (cita.abono == cita.costo_total) {
		message = 'Su cita ha sido pagada completamente';
	} else {
		message = 'Su cita quedo reagendada para el dia ' + convertirFechaPersonalizada(fecha_cita.slice(0, -1));
	}

	const data = {
		apikey: 'T7hkUB5FPHqHHDl3QGdBah0/637t8DJjDB4L0PwhHVIphg6I7H3ENYebZtBwI/tu6Q/orzj8KAjEoc6IxC0Ulw==',
		nameTemplate: 'RESCHEDULE',
		msisdn: '52' + numero,
		variables: [
			{ sequence: 1, data: parseFloat(abono).toFixed(2) },
			{ sequence: 2, data: message }
		]
	};

	const config = {
		headers: {
			'Authorization': 'Bearer ' + jwtToken,
			'Content-Type': 'application/json'
		}
	};

	try {
		const response = await axios.post(url, data, config);
		console.log('Respuesta recibida:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error al realizar la solicitud:', error);
		return error;
	}
}

export const deleteDate = async (idDate: string): Promise<any> => {
	try {
		const result = await deleteDateById(idDate); // Llamada a la función en database
		console.log(result);
		return result; // Devuelve el resultado de la eliminación
	} catch (error) {
		throw error;
	}
};