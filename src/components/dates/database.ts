import db from "../../database"

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