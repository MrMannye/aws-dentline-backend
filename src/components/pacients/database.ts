
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
                signosvitales.antecedentes_medicos, 
                signosvitales.peso, 
                signosvitales.pulso, 
                signosvitales.presion, 
                signosvitales.alergias
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

export const getDateByIdDate = async (id_cita: string) => {
	try {
		const [rows, _fields] = await db.query(`
            SELECT 
                c.motivo,
                c.costo_total,
                c.fecha_cita,
                c.abono
            FROM 
                citas c
            WHERE 
                c.id_cita = ?;
            `, [id_cita])
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

export const updatePacientProfileById = async (direccion: string, profesion: string, edad: number, estado_civil: string, idPacient: string) => {
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
            `, [direccion, profesion, edad, estado_civil, idPacient])
		return rows
	} catch (error) {
		return error
	}
}

export const updateVitalSignsById = async (tipo_sangre: string, antecedentes_medicos: number, peso: number, pulso: number, presion: number, alergias: number, id_paciente: string) => {
	try {
		const [rows, _fields] = await db.query(`
            UPDATE 
                signosvitales
            SET 
                tipo_sangre = ?,
                antecedentes_medicos = ?, 
                peso = ?, 
                pulso = ?, 
                presion = ?, 
                alergias = ?
            WHERE 
                id_paciente = ?;
            `, [tipo_sangre, antecedentes_medicos, peso, pulso, presion, alergias, id_paciente])
		return rows
	} catch (error) {
		return error
	}
}

export const postPacientRecapDate = async (id_paciente: string, id_dentista: string, fecha_cita: string, motivo: string, costo_total: string, observaciones: string) => {
	try {
		const [rows, _fields] = await db.query(`
            INSERT INTO citas (id_paciente, id_dentista, fecha_cita, motivo, costo_total, observaciones)
            VALUES (?, ?, ?, ?, ?);
            `, [id_paciente, id_dentista, fecha_cita, motivo, costo_total, observaciones])
		return rows
	} catch (error) {
		return error
	}
}

export const postPacientRecapDateTreatment = async (id_paciente: string, id_dentista: string, motivo: string, costo_total: string) => {
	try {
		const [rows, _fields] = await db.query(`
            INSERT INTO citas_tratamientos (id_cita, motivo, costo_total)
            VALUES (
                (SELECT id_cita 
                FROM citas 
                WHERE id_paciente = ?
                AND id_dentista = ?
                ORDER BY fecha_cita DESC
				LIMIT 1
                ), ?, ?);
            `, [id_paciente, id_dentista, motivo, costo_total])
		return rows
	} catch (error) {
		return error
	}
}