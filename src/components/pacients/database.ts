import db from '../../database'

export const getPacientProfileById = async (idPacient: string) => {
	try {
		const [rows, _fields] = await db.query(`
            SELECT 
                pacientes.nombre AS nombre_paciente, 
                pacientes.profesion, 
                pacientes.edad, 
                pacientes.fecha_nacimiento, 
                pacientes.direccion, 
                pacientes.telefono, 
                pacientes.email, 
                pacientes.estado_civil
            FROM 
                pacientes
            WHERE 
                id_paciente = ?;
            `, [idPacient])
		return rows
	} catch (error) {
		return error
	}
}

export const getVitalSignsById = async (idPacient: string) => {
	try {
		const [rows, _fields] = await db.query(`
            SELECT 
                signosvitales.tipo_sangre, 
                signosvitales.estatura, 
                signosvitales.peso, 
                signosvitales.pulso, 
                signosvitales.presion, 
                signosvitales.temperatura
            FROM 
                signosvitales
            WHERE 
                signosvitales.id_paciente = ?;
            `, [idPacient])
		return rows
	} catch (error) {
		return error
	}
}



// !! FALTA: HISTORIAL CLINICO 
export const getHistoryPacientById = async (idPacient: string) => {
	try {
		const [rows, _fields] = await db.query(`SELECT * FROM dentistas WHERE id_dentista = ?`, [idPacient])
		return rows
	} catch (error) {
		return error
	}
}

export const updatePacientProfileById = async (direccion: string, profesion: string, edad: number,  estado_civil:string, idPacient: string) => {
	try {
		const [rows, _fields] = await db.query(`
            UPDATE 
                pacientes
            SET 
                direccion = ?, 
                profesion = ?, 
                edad = ?, 
                estado_civil = ?
            WHERE 
                id_paciente = ?;
            `, [direccion,profesion,edad,estado_civil,idPacient])
		return rows
	} catch (error) {
		return error
	}
}

export const updateVitalSignsById = async (tipo_sangre: string, estatura: number, peso: number,  pulso: number, presion: number, temperatura: number, id_paciente: string) => {
	try {
		const [rows, _fields] = await db.query(`
            UPDATE 
                signosvitales
            SET 
                tipo_sangre = ?,
                estatura = ?, 
                peso = ?, 
                pulso = ?, 
                presion = ?, 
                temperatura = ?
            WHERE 
                id_paciente = ?;
            `, [tipo_sangre, estatura, peso, pulso, presion, temperatura, id_paciente])
		return rows
	} catch (error) {
		return error
	}
}