import { getDentistById, getNextDatesById, getPacients , addDentist, updateDentistById } from "./database"

export const getDentist = async (idDentist: string) => {
	try {
		const dentist = getDentistById(idDentist)
		return dentist
	} catch (error) {
		return error
	}
}

export const getNextDates = async (idDentist: string) => {
	try {
		const citasProx = getNextDatesById(idDentist)
		return citasProx
	} catch (error) {
		return error
	}
}

export const getAllPacients = async (idDentist: string) => {
	try {
		const allPacients = getPacients(idDentist)
		return allPacients
	} catch (error) {
		return error
	}
}

export const postDentist = async (idDentist: string) => {
	try {
		const dentist = addDentist(idDentist)
		return dentist
	} catch (error) {
		return error
	}
}

export const putDentist = async (idDentist: string) => {
	try {
		const dentist = updateDentistById(idDentist)
		return dentist
	} catch (error) {
		return error
	}
}