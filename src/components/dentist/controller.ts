import { getDentistById, getNextDatesById, getPacients , addDentist, updateDentistById, getAllDatesById, getAllDatesRecapById, getValidDentistByWallet, addNewDentistByWallet} from "./database"
import CryptoJS from 'crypto-js';

const secretKey: string = process.env.SECRET_KEY_DENTIST || 'abc_def_ghi';

export const getDentist = async (idDentist: string) => {
  try {
    const dentist: any = await getDentistById(idDentist);
		
    // Desencriptar los campos sensibles
    if (dentist[0].wallet_address) {
      const bytesTarjeta = CryptoJS.AES.decrypt(dentist[0].numero_tarjeta, secretKey);
      dentist[0].numero_tarjeta = bytesTarjeta.toString(CryptoJS.enc.Utf8);
    }

    if (dentist[0].cuenta_clabe) {
      const bytesClabe = CryptoJS.AES.decrypt(dentist[0].cuenta_clabe, secretKey);
      dentist[0].cuenta_clabe = bytesClabe.toString(CryptoJS.enc.Utf8);
    }

		if (dentist[0].wallet_address) {
      const bytesWallet = CryptoJS.AES.decrypt(dentist[0].wallet_address, secretKey);
      dentist[0].wallet_address = bytesWallet.toString(CryptoJS.enc.Utf8);
    }
		
    return dentist;
  } catch (error) {
    return error;
  }
};

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
    // Cifrar los datos sensibles antes de actualizar
    const encryptedTarjeta = CryptoJS.AES.encrypt(numero_tarjeta, secretKey).toString();
    const encryptedClabe = CryptoJS.AES.encrypt(cuenta_clabe, secretKey).toString();
		const encryptedWallet = CryptoJS.AES.encrypt(wallet_address, secretKey).toString();

    const dentist = await updateDentistById(
      nombre,
      especializacion,
      telefono,
      email,
      encryptedTarjeta,  // Guardamos la tarjeta cifrada
      encryptedClabe,  // Guardamos la CLABE cifrada
      encryptedWallet,
      idDentist
    );
    return dentist;
  } catch (error) {
    return error;
  }
};