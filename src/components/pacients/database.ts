
import { QueryResult } from 'mysql2'
import db from '../../database'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your_secret_key'; // Llave de encriptación (32 caracteres)

export const getPacientProfileById = async (idPacient: string) => {
	try {
			const query = `
					SELECT 
							AES_DECRYPT(pacientes.nombre, ?) AS nombre_paciente, 
							pacientes.profesion, 
							pacientes.edad, 
							pacientes.fecha_nacimiento, 
							AES_DECRYPT(pacientes.direccion, ?) AS direccion, 
							AES_DECRYPT(pacientes.telefono, ?) AS telefono, 
							AES_DECRYPT(pacientes.email, ?) AS email, 
							pacientes.estado_civil
					FROM 
							pacientes
					WHERE 
							id_paciente = ?;
			`;

			const [rows, _fields] = await db.query(query, [
					ENCRYPTION_KEY,
					ENCRYPTION_KEY,
					ENCRYPTION_KEY,
					ENCRYPTION_KEY,
					idPacient
			]);

			return rows;
	} catch (error) {
			return error;
	}
};

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
			const query = `
					SELECT 
							AES_DECRYPT(c.motivo, ?) AS motivo,
							c.costo_total,
							c.fecha_cita,
							c.abono,
							AES_DECRYPT(c.observaciones, ?) AS observaciones,
							p.id_paciente,
							p.profesion,
							p.edad,
							sv.peso,
							sv.pulso,
							sv.presion,
							sv.antecedentes_medicos,
							AES_DECRYPT(p.nombre, ?) AS nombre,
							AES_DECRYPT(p.telefono, ?) AS telefono,
							AES_DECRYPT(p.email, ?) AS email,
							sv.tipo_sangre,         -- Tipo de sangre del paciente
							sv.alergias             -- Alergias del paciente
					FROM 
							citas c
					JOIN 
							pacientes p ON c.id_paciente = p.id_paciente
					LEFT JOIN 
							signosvitales sv ON p.id_paciente = sv.id_paciente  -- JOIN con la tabla signosvitales
					WHERE 
							c.id_cita = ?;
			`;

			const [rows, _fields] = await db.query(query, [
					ENCRYPTION_KEY,
					ENCRYPTION_KEY,
					ENCRYPTION_KEY,
					ENCRYPTION_KEY,
					ENCRYPTION_KEY,
					id_cita
			]);

			return rows;
	} catch (error) {
			return error;
	}
};


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
			const query = `
					UPDATE 
							pacientes
					SET 
							direccion = AES_ENCRYPT(?, ?),
							profesion = ?, 
							edad = ?, 
							estado_civil = ?
					WHERE 
							id_paciente = ?;
			`;

			const [rows, _fields] = await db.query(query, [
					direccion,
					ENCRYPTION_KEY,
					profesion,
					edad,
					estado_civil,
					idPacient
			]);

			return rows;
	} catch (error) {
			return error;
	}
};


export const updateVitalSignsById = async (tipo_sangre: string, antecedentes_medicos: string, peso: number, pulso: number, presion: number, alergias: number, id_paciente: string): Promise<QueryResult | any> => {
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

export const postVitalSignsById = async (tipo_sangre: string, antecedentes_medicos: string, peso: number, pulso: number, presion: number, alergias: number, id_paciente: string) => {
	try {
		const [rows, _fields] = await db.query(`
            INSERT INTO signosvitales (id_paciente, tipo_sangre, antecedentes_medicos, peso, pulso, presion, alergias)
            VALUES (?,?,?,?,?,?,?);
            `, [id_paciente, tipo_sangre, antecedentes_medicos, peso, pulso, presion, alergias])
		return rows
	} catch (error) {
		return error
	}
}

export const postPacientRecapDate = async (id_paciente: string, id_dentista: number, fecha_cita: string, motivo: string, costo_total: number, observaciones: string) => {
	try {
			const query = `
					INSERT INTO citas (id_paciente, id_dentista, fecha_cita, motivo, costo_total, observaciones)
					VALUES (?, ?, ?, AES_ENCRYPT(?, ?), ?, AES_ENCRYPT(?, ?));
			`;

			const [rows, _fields] = await db.query(query, [
					parseInt(id_paciente),
					id_dentista,
					fecha_cita,
					motivo,
					ENCRYPTION_KEY,
					costo_total,
					observaciones,
					ENCRYPTION_KEY
			]);

			console.log(rows);
			return rows;
	} catch (error) {
			return error;
	}
};


export const postPacientRecapDateTreatment = async (id_paciente: string, id_dentista: number, motivo: string, costo_total: number) => {
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

export const postAddNewPacient = async (
	nombre: string,
	profesion: string,
	edad: number,
	estado_civil: string,
	fecha_nacimiento: Date,
	direccion: string,
	telefono: string,
	email: string,
	id_dentista: number) => {
	try {
			const query = `
					INSERT INTO pacientes (nombre, profesion, edad, estado_civil, fecha_nacimiento, direccion, telefono, email, id_dentista)
					VALUES (AES_ENCRYPT(?, ?), ?, ?, ?, ?, AES_ENCRYPT(?, ?), AES_ENCRYPT(?, ?), AES_ENCRYPT(?, ?), ?);
			`;

			const [rows, _fields] = await db.query(query, [
					nombre,
					ENCRYPTION_KEY,
					profesion,
					edad,
					estado_civil,
					fecha_nacimiento,
					direccion,
					ENCRYPTION_KEY,
					telefono,
					ENCRYPTION_KEY,
					email,
					ENCRYPTION_KEY,
					id_dentista
			]);
			return rows;
	} catch (error) {
			return error;
	}
};


export const deletePacientById = async (id_paciente: string) => {
	try {
		const [rows, _fields] = await db.query(`
            DELETE FROM pacientes WHERE id_paciente = ?;
            `, [id_paciente])
		return rows
	} catch (error) {
		return error
	}
}

export const checkVitalSignsByPacientId = async (idPacient: string) => {
	try {
		const [rows, _fields] = await db.query(`
            SELECT 1 FROM signosvitales
            WHERE id_paciente = ?
            LIMIT 1;  -- Solo devuelve una fila si existe
        `, [idPacient]);
		return rows;
	} catch (error) {
		throw new Error('Error al consultar signos vitales en la base de datos');
	}
};
