import { getDentistById, getNextDatesById, getPacients , addDentist, updateDentistById, getAllDatesById, getAllDatesRecapById, getValidDentistByWallet, addNewDentistByWallet} from "./database"

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

export const getAllDates = async (idDentist: string) => {
	try {
		const allDates = getAllDatesById(idDentist)
		return allDates
	} catch (error) {
		return error
	}
}

export const getAllDatesRecap = async (idDentist: string) => {
	try {
		const allDatesRecap = getAllDatesRecapById(idDentist)
		return allDatesRecap
	} catch (error) {
		return error
	}
}

export const getValidDentist = async (wallet_address: string) => {
  try {
    const validDentist:any = await getValidDentistByWallet(wallet_address);
		
    if (validDentist[0].wallet_address.length > 0) {
      return validDentist;
    } 
  } catch (error) {
		const addDentist = await addNewDentistByWallet (wallet_address);
    return addDentist;
  }
};

export const postDentist = async (idDentist: string) => {
	try {
		const dentist = addDentist(idDentist)
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

export const putDentist = async ({nombre, especializacion, telefono, email, numero_tarjeta, cuenta_clabe, wallet_address,idDentist}: DentistData) => {
	try {
		const dentist = updateDentistById(nombre, especializacion, telefono, email, numero_tarjeta, cuenta_clabe, wallet_address,idDentist)
		return dentist
	} catch (error) {
		return error
	}
}