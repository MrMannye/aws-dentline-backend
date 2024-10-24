import { getDentistById, getNextDatesById, getPacients, addDentist, updateDentistById, getAllDatesById, getAllDatesRecapById, getValidDentistByWallet, addNewDentistByWallet } from "./database"
import CryptoJS from 'crypto-js';

const secretKey: string = process.env.SECRET_KEY_DENTIST || 'abc_def_ghi';

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
		// Cifrar el wallet_address antes de consultar
		const encryptedWallet = CryptoJS.AES.encrypt(wallet_address, secretKey).toString();
		const validDentist: any = await getValidDentistByWallet(encryptedWallet);

		if (validDentist[0].wallet_address.length > 0) {
			// Desencriptar el wallet_address antes de devolverlo
			const bytesWallet = CryptoJS.AES.decrypt(validDentist[0].wallet_address, secretKey);
			validDentist[0].wallet_address = bytesWallet.toString(CryptoJS.enc.Utf8);
			return validDentist;
		}
	} catch (error) {
		// Cifrar wallet_address antes de guardar un nuevo dentista
		const encryptedWallet = CryptoJS.AES.encrypt(wallet_address, secretKey).toString();
		const addDentist = await addNewDentistByWallet(encryptedWallet);
		return addDentist;
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