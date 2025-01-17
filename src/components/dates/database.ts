import db from "../../database"

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your_secret_key'; // Llave de encriptación (32 caracteres)

export const getHoursDisableDB = async (date: Date) => {
	try {
		console.log(date)
		const [rows, _fields] = await db.query(`CALL obtener_disabled_hours(?)`, [date])
		console.log(rows)
		return rows
	} catch (error) {
		return error
	}
}

export const putAbonoDB = async (abono: number, id_cita: number) => {
	try {
		const [rows, _fields] = await db.query(`
			UPDATE 
				citas
			SET 
				abono = abono + ?
			WHERE 
				id_cita = ?
			AND
				(abono + ?) <= costo_total;;
			`, [abono, id_cita, abono])
		return rows
	} catch (error) {
		return error
	}
}

export const putDateDB = async (id_cita: string, fecha_cita: string) => {
	try {
		const [rows, _fields] = await db.query(`
			UPDATE 
				citas
			SET 
				fecha_cita = ?
			WHERE 
				id_cita = ?;
			`, [fecha_cita, id_cita])
		return rows
	} catch (error) {
		return error
	}
}

export const deleteDateById = async (idDate: string) => {
	try {
		const [result, _fields] = await db.query(`
            DELETE FROM citas
            WHERE id_cita = ?;
        `, [idDate]);
		console.log(result);
		return result; // Devuelve el resultado de la operación
	} catch (error) {
		throw error;
	}
};

export const putMotivoDB = async (motivo: string, id_cita: string, costo_total: number) => {
	try {
		const [rows, _fields] = await db.query(`
			UPDATE 
				citas
			SET 
				motivo = AES_ENCRYPT(?, ?),
				costo_total = ?
			WHERE 
				id_cita = ?;
			`, [motivo, ENCRYPTION_KEY, costo_total, id_cita])
		console.log(rows)
		return rows
	} catch (error) {
		return error
	}
}