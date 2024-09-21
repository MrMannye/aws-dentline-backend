import db from '../../database'

export const getDentistById = async (idDentist: string) => {
	try {
		const [rows, _fields] = await db.query(`SELECT * FROM dentistas WHERE id_dentista = ?`, [idDentist])
		return rows
	} catch (error) {
		return error
	}
}

export const addDentist = async (idDentist: string) => {
	try {
		const [rows, _fields] = await db.query(`SELECT * FROM dentistas WHERE id_dentista = ?`, [idDentist])
		return rows
	} catch (error) {
		return error
	}
}

export const updateDentistById = async (idDentist: string) => {
	try {
		const [rows, _fields] = await db.query(`SELECT * FROM dentistas WHERE id_dentista = ?`, [idDentist])
		return rows
	} catch (error) {
		return error
	}
}