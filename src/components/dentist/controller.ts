import { getDentistById, getNextDatesById, getPacients, addDentist, updateDentistById, getAllDatesById, getAllDatesRecapById, getValidDentistByWallet, addNewDentistByWallet } from "./database"

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
		const citasProx = await getNextDatesById(idDentist)
		return citasProx
	} catch (error) {
		return error
	}
}

export const getAllPacients = async (idDentist: string) => {
	try {
		const allPacients = await getPacients(idDentist)
		return allPacients
	} catch (error) {
		return error
	}
}

export const getAllDates = async (idDentist: string) => {
	try {
		const allDates = await getAllDatesById(idDentist)
		return allDates
	} catch (error) {
		return error
	}
}

export const getAllDatesRecap = async (idDentist: string) => {
	try {
		const allDatesRecap = await getAllDatesRecapById(idDentist)
		return allDatesRecap
	} catch (error) {
		return error
	}
}

export const getValidDentist = async (wallet_address: string) => {
	try {

		const validDentist: any = await getValidDentistByWallet(wallet_address);
		if (validDentist.length) {
			return validDentist;
		} else {
			await addNewDentistByWallet(wallet_address);
			const validDentist: any = await getValidDentistByWallet(wallet_address);
			console.log(validDentist)
			return validDentist;
		}
	} catch (error) {
		// Return error if there is no valid dentist
		return error
	}
};

export const postDentist = async (idDentist: string) => {
	try {
		const dentist = await addDentist(idDentist)
		return dentist
	} catch (error) {
		return error
	}
}

interface DentistData {
	nombre: string,
	especializacion: string,
	telefono: string,
	email: string,
	numero_tarjeta: string,
	cuenta_clabe: string,
	wallet_address: string,
	idDentist: string
}

export const putDentist = async ({ nombre, especializacion, telefono, email, numero_tarjeta, cuenta_clabe, wallet_address, idDentist }: DentistData) => {
	try {
		const dentist = updateDentistById(nombre, especializacion, telefono, email, numero_tarjeta, cuenta_clabe, wallet_address, idDentist)
		return dentist
	} catch (error) {
		return error
	}
}