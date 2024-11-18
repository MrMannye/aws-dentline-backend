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