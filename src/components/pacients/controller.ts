import { getPacientProfileById, updatePacientProfileById, getHistoryPacientById, getVitalSignsById, updateVitalSignsById, postPacientRecapDate, postPacientRecapDateTreatment, getDateByIdDate, postVitalSignsById, postAddNewPacient, deletePacientById, checkVitalSignsByPacientId } from './database';

const secretKey: string = process.env.SECRET_KEY_PACIENTS || 'jkl_mno_pqr';

export const getPacientProfile = async (idPacient: string) => {
	try {
		const allPacients: any = await getPacientProfileById(idPacient);

		// Desencriptar la dirección
		if (allPacients.direccion) {
			const bytesDireccion = CryptoJS.AES.decrypt(allPacients.direccion, secretKey);
			allPacients.direccion = bytesDireccion.toString(CryptoJS.enc.Utf8);
		}

		return allPacients;
	} catch (error) {
		return error;
	}
};

export const getHistoryPacient = async (idPacient: string) => {
	try {
		const allPacients = getHistoryPacientById(idPacient)
		return allPacients
	} catch (error) {
		return error
	}
}

export const getVitalSigns = async (idPacient: string) => {
	try {
		const vitalSigns = getVitalSignsById(idPacient)
		return vitalSigns
	} catch (error) {
		return error
	}
}

export const getDateById = async (id_cita: string) => {
	try {
		const DateByIdDate = await getDateByIdDate(id_cita)
		console.log(DateByIdDate)
		return DateByIdDate
	} catch (error) {
		return error
	}
}

interface PacientData {
	id_paciente: string,
	direccion: string,
	profesion: string,
	edad: number,
	estado_civil: string
}

export const putPacientProfile = async ({ id_paciente, direccion, profesion, edad, estado_civil }: PacientData) => {
	try {
		const profile = await updatePacientProfileById(direccion, profesion, edad, estado_civil, id_paciente);
		return profile;
	} catch (error) {
		return error;
	}
}

interface VitalSignsData {
	tipo_sangre: string,
	antecedentes_medicos: string,
	peso: number,
	pulso: number,
	presion: number,
	alergias: number,
	id_paciente: string
}

export const putVitalSigns = async ({ tipo_sangre, antecedentes_medicos, peso, pulso, presion, alergias, id_paciente }: VitalSignsData) => {
	try {
		const updateVitalSigns: any = await updateVitalSignsById(tipo_sangre, antecedentes_medicos, peso, pulso, presion, alergias, id_paciente);
		console.log(updateVitalSigns)
		if (updateVitalSigns.affectedRows != 0) {
			return updateVitalSigns;
		} else {
			const newVital = await postVitalSignsById(tipo_sangre, antecedentes_medicos, peso, pulso, presion, alergias, id_paciente);
			console.log(newVital)
			return newVital
		}
	} catch (error) {
		return error
	}
}

export const postVitalSigns = async ({ tipo_sangre, antecedentes_medicos, peso, pulso, presion, alergias, id_paciente }: VitalSignsData) => {
	try {
		const postVitalSigns = postVitalSignsById(tipo_sangre, antecedentes_medicos, peso, pulso, presion, alergias, id_paciente)
		return postVitalSigns
	} catch (error) {
		return error
	}
}

interface RecapData {
	id_paciente: string,
	id_dentista: number,
	fecha_cita: string,
	motivo: string,
	costo_total: number,
	observaciones: string
}

export const postRecapDate = async ({ id_paciente, id_dentista, fecha_cita, motivo, costo_total, observaciones }: RecapData) => {
	try {
		const recapDate = await postPacientRecapDate(id_paciente, id_dentista, fecha_cita, motivo, costo_total, observaciones);
		const recapDateTreatment = await postPacientRecapDateTreatment(id_paciente, id_dentista, motivo, costo_total)
		console.log(recapDate)
		return [recapDate, recapDateTreatment]
	} catch (error) {
		return error
	}
}

interface AddPaciente {
	nombre: string,
	profesion: string,
	edad: number,
	estado_civil: string,
	fecha_nacimiento: Date,
	direccion: string,
	telefono: string,
	email: string
	id_dentista: number
}

export const postAddPacient = async ({ nombre, profesion, edad, estado_civil, fecha_nacimiento, direccion, telefono, email, id_dentista }: AddPaciente) => {
	try {
		const newPacient = await postAddNewPacient(nombre, profesion, edad, estado_civil, fecha_nacimiento, direccion, telefono, email, id_dentista)
		console.log(newPacient)
		return newPacient
	} catch (error) {
		return error
	}
}

export const deletePaciente = async (idPacient: string) => {
	try {
		const deletePacient = deletePacientById(idPacient)
		return deletePacient
	} catch (error) {
		return error
	}
}

export const hasVitalSigns = async (idPacient: string): Promise<boolean> => {
	try {
		const vitalSigns: any = await checkVitalSignsByPacientId(idPacient); // Llama a la función de la base de datos
		return vitalSigns.length > 0; // Retorna true si existen registros, false si no.
	} catch (error) {
		throw new Error('Error al verificar signos vitales');
	}
};
