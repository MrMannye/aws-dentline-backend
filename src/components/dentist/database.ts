import db from '../../database'

export const getDentistById = async (idDentist: string) => {
	try {
		const [rows, _fields] = await db.query(`SELECT * FROM dentistas WHERE id_dentista = ?`, [idDentist])
		return rows
	} catch (error) {
		return error
	}
}

export const getNextDatesById = async (idDentist: string) => {
	try {
		const [rows, _fields] = await db.query(`
            SELECT 
                pacientes.nombre AS nombre_paciente, 
                pacientes.profesion, 
                citas.fecha_cita
            FROM 
                pacientes
            JOIN 
                citas ON pacientes.id_paciente = citas.id_paciente
            WHERE 
                DATE(citas.fecha_cita) = CURDATE()
                AND citas.id_dentista = ?
            `, [idDentist])
		return rows
	} catch (error) {
		return error
	}
}

export const getPacients = async (idDentist: string) => {
	try {
		const [rows, _fields] = await db.query(`
            SELECT 
                pacientes.nombre AS nombre_paciente
            FROM 
                pacientes
            JOIN 
                dentistas ON pacientes.id_dentista = dentistas.id_dentista
            WHERE 
                dentistas.id_dentista = ?;
            `, [idDentist])
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