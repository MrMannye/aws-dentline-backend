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

export const getAllDatesById = async (idDentist: string) => {
	try {
		const [rows, _fields] = await db.query(`
      SELECT 
					citas.fecha_cita
			FROM 
					citas
			WHERE 
					citas.id_dentista = ?;
      `, [idDentist])
		return rows
	} catch (error) {
		return error
	}
}

export const getAllDatesRecapById = async (idDentist: string) => {
	try {
		const [rows, _fields] = await db.query(`
      SELECT 
					c.id_cita,
					p.nombre AS nombre_paciente,
					c.fecha_cita,
					c.costo_total,
					TIME(c.fecha_cita) AS hora_cita
			FROM 
					pacientes p
			JOIN 
					citas c ON p.id_paciente = c.id_paciente
			WHERE 
					c.id_dentista = ?;
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

export const updateDentistById = async (nombre: string, especializacion: string, telefono: string, email: string, numero_tarjeta: string, cuenta_clabe: string, wallet_address: string, idDentist: string) => {
	try {
		const [rows, _fields] = await db.query(`
			UPDATE dentistas
			SET 
					nombre = ?,
					especializacion = ?,
					telefono = ?,
					email = ?,
					numero_tarjeta = ?,
					cuenta_clabe = ?,
					wallet_address = ?
			WHERE 
					id_dentista = ?;
			`, [ nombre, especializacion, telefono, email, numero_tarjeta, cuenta_clabe, wallet_address,idDentist])
		return rows
	} catch (error) {
		return error
	}
}