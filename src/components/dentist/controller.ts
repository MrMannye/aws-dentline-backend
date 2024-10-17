import { getDentistById, addDentist, updateDentistById } from "./database"


export const getDentist = async (idDentist: string) => {
	try {
		if (!idDentist) {
			throw new Error('Id is required')
		}
		const dentist = getDentistById(idDentist)
		return dentist
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