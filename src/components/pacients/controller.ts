import {getPacientProfileById, updatePacientProfileById, getHistoryPacientById, getVitalSignsById, updateVitalSignsById} from './database';

export const getPacientProfile = async (idPacient: string) => {
	try {
		const allPacients = getPacientProfileById(idPacient)
		return allPacients
	} catch (error) {
		return error
	}
}

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

interface PacientData {
	id_paciente: string,
	direccion: string, 
  profesion: string, 
  edad: number, 
  estado_civil: string
}

export const putPacientProfile = async ({id_paciente, direccion, profesion, edad, estado_civil}: PacientData) => {
	try {
		const pacient = updatePacientProfileById(direccion, profesion, edad, estado_civil, id_paciente)
		return pacient
	} catch (error) {
		return error
	}
}
interface VitalSignsData {
	tipo_sangre: string,
	estatura: number, 
	peso: number, 
	pulso: number, 
	presion: number, 
	temperatura: number,
	id_paciente: string
}

export const putVitalSigns = async ({tipo_sangre, estatura, peso, pulso, presion, temperatura, id_paciente}: VitalSignsData) => {
	try {
		const pacient = updateVitalSignsById(tipo_sangre, estatura, peso, pulso, presion, temperatura, id_paciente)
		return pacient
	} catch (error) {
		return error
	}
}