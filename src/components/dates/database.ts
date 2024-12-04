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