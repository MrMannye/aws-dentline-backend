import {getPacientProfileById, updatePacientProfileById, getHistoryPacientById, getVitalSignsById, updateVitalSignsById, postPacientRecapDate, postPacientRecapDateTreatment, getDateByIdDate} from './database';

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
		const DateByIdDate = getDateByIdDate(id_cita)
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
    // Encriptar la dirección antes de almacenarla
    const encryptedDireccion = CryptoJS.AES.encrypt(direccion, secretKey).toString();

    const profile = await updatePacientProfileById(encryptedDireccion, profesion, edad, estado_civil, id_paciente);
    return profile;
  } catch (error) {
    return error;
  }
}

interface VitalSignsData {
	tipo_sangre: string,
	antecedentes_medicos: number, 
	peso: number, 
	pulso: number, 
	presion: number, 
	alergias: number,
	id_paciente: string
}

export const putVitalSigns = async ({tipo_sangre, antecedentes_medicos, peso, pulso, presion, alergias, id_paciente}: VitalSignsData) => {
	try {
		const updateVitalSigns = updateVitalSignsById(tipo_sangre, antecedentes_medicos, peso, pulso, presion, alergias, id_paciente)
		return updateVitalSigns
	} catch (error) {
		return error
	}
}

interface RecapData {
	id_paciente: string, 
	id_dentista: string, 
	fecha_cita: string, 
	motivo: string, 
	costo_total: string,
	observaciones: string
}

export const postRecapDate = async ({id_paciente, id_dentista, fecha_cita, motivo, costo_total, observaciones}: RecapData) => {
	try {
		const recapDate = postPacientRecapDate(id_paciente, id_dentista, fecha_cita, motivo, costo_total,observaciones);
		const recapDateTreatment = postPacientRecapDateTreatment(id_paciente, id_dentista, motivo, costo_total)
		return [recapDate, recapDateTreatment]
	} catch (error) {
		return error
	}
}
