import db from '../../database'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your_secret_key'; // Llave de encriptación (32 caracteres)

export const getDentistById = async (idDentist: string) => {
    try {
        const [rows, _fields] = await db.query(`
            SELECT 
                AES_DECRYPT(nombre, ?) AS nombre,
                especializacion,
                AES_DECRYPT(telefono, ?) AS telefono,
                AES_DECRYPT(email, ?) AS email,
                AES_DECRYPT(numero_tarjeta, ?) AS numero_tarjeta,
                AES_DECRYPT(cuenta_clabe, ?) AS cuenta_clabe,
                wallet_address
            FROM dentistas WHERE id_dentista = ?`, [
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            idDentist
        ]);
        return rows;
    } catch (error) {
        return error;
    }
};

export const getNextDatesById = async (idDentist: string) => {
    try {
        const [rows, _fields] = await db.query(`
            SELECT 
                AES_DECRYPT(pacientes.nombre, ?) AS nombre_paciente,
                pacientes.profesion, 
                citas.fecha_cita,
                citas.id_cita
            FROM 
                pacientes
            JOIN 
                citas ON pacientes.id_paciente = citas.id_paciente
            WHERE 
                DATE(citas.fecha_cita) = CURDATE()
                AND citas.abono < citas.costo_total
                AND citas.id_dentista = ?`, [ENCRYPTION_KEY, idDentist]);
        console.log(rows);
        return rows;
    } catch (error) {
        return error;
    }
};

export const getPacients = async (idDentist: string) => {
    try {
        const [rows, _fields] = await db.query(`
            SELECT 
                AES_DECRYPT(pacientes.nombre, ?) as nombre_paciente,
                pacientes.id_paciente
            FROM 
                pacientes
            JOIN 
                dentistas ON pacientes.id_dentista = dentistas.id_dentista
            WHERE 
                dentistas.id_dentista = ?
            ORDER BY nombre_paciente ASC;
        `, [ENCRYPTION_KEY, idDentist]);
        return rows;
    } catch (error) {
        return error;
    }
};

export const getAllDatesById = async (idDentist: string) => {
    try {
        const [rows, _fields] = await db.query(`
            SELECT 
                citas.fecha_cita
            FROM 
                citas
            WHERE 
                citas.id_dentista = ?;
        `, [idDentist]);
        return rows;
    } catch (error) {
        return error;
    }
};

export const getAllDatesRecapById = async (idDentist: string) => {
    try {
        const [rows, _fields] = await db.query(`
            SELECT 
                c.id_cita,
                AES_DECRYPT(p.nombre, ?) AS nombre_paciente,
                c.fecha_cita,
                c.costo_total,
                AES_DECRYPT(c.observaciones, ?) AS observaciones,
                TIME(c.fecha_cita) AS hora_cita
            FROM 
                pacientes p
            JOIN 
                citas c ON p.id_paciente = c.id_paciente
            WHERE 
                c.id_dentista = ?
                AND c.abono <> c.costo_total;
        `, [ENCRYPTION_KEY, ENCRYPTION_KEY, idDentist]);
        return rows;
    } catch (error) {
        return error;
    }
};

export const getValidDentistByWallet = async (wallet_address: string) => {
    try {
        const [rows, _fields] = await db.query(`
            SELECT
								id_dentista,
                AES_DECRYPT(nombre, ?) AS nombre,
                especializacion,
                AES_DECRYPT(telefono, ?) AS telefono,
                AES_DECRYPT(email, ?) AS email,
                AES_DECRYPT(numero_tarjeta, ?) AS numero_tarjeta,
                AES_DECRYPT(cuenta_clabe, ?) AS cuenta_clabe,
                wallet_address
            FROM dentistas WHERE wallet_address = ?
        `, [
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            wallet_address
        ]);
        return rows;
    } catch (error) {
        return error;
    }
};

export const addNewDentistByWallet = async (wallet_address: string) => {
    try {
        const [rows, _fields] = await db.query(`
            INSERT INTO dentistas (nombre, especializacion, telefono, email, numero_tarjeta, cuenta_clabe, wallet_address)
            VALUES (AES_ENCRYPT('', ?), '', AES_ENCRYPT('', ?), AES_ENCRYPT('', ?), AES_ENCRYPT('', ?), AES_ENCRYPT('', ?), ?)
        `, [
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            wallet_address
        ]);
        return rows;
    } catch (error) {
        return error;
    }
};

export const addDentist = async (idDentist: string) => {
    try {
        const [rows, _fields] = await db.query(`
            SELECT 
                AES_DECRYPT(nombre, ?) AS nombre,
                especializacion,
                AES_DECRYPT(telefono, ?) AS telefono,
                AES_DECRYPT(email, ?) AS email,
                AES_DECRYPT(numero_tarjeta, ?) AS numero_tarjeta,
                AES_DECRYPT(cuenta_clabe, ?) AS cuenta_clabe,
                wallet_address
            FROM dentistas WHERE id_dentista = ?
        `, [
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            ENCRYPTION_KEY,
            idDentist
        ]);
        return rows;
    } catch (error) {
        return error;
    }
};

export const updateDentistById = async (nombre: string, especializacion: string, telefono: string, email: string, numero_tarjeta: string, cuenta_clabe: string, wallet_address: string, idDentist: string) => {
    try {
        const [rows, _fields] = await db.query(`
            UPDATE dentistas
            SET 
                nombre = AES_ENCRYPT(?, ?),
                especializacion = ?,
                telefono = AES_ENCRYPT(?, ?),
                email = AES_ENCRYPT(?, ?),
                numero_tarjeta = AES_ENCRYPT(?, ?),
                cuenta_clabe = AES_ENCRYPT(?, ?),
                wallet_address = ?
            WHERE 
                id_dentista = ?;
        `, [
            nombre,
            ENCRYPTION_KEY,
            especializacion,
            telefono,
            ENCRYPTION_KEY,
            email,
            ENCRYPTION_KEY,
            numero_tarjeta,
            ENCRYPTION_KEY,
            cuenta_clabe,
            ENCRYPTION_KEY,
            wallet_address,
            idDentist
        ]);
        return rows;
    } catch (error) {
        return error;
    }
};

export const countPatientsByDentistId = async (idDentist: string): Promise<any> => {
    try {
        const [rows, _fields] = await db.query(`
            SELECT COUNT(*) AS totalPatients
            FROM pacientes
            WHERE id_dentista = ?;
        `, [idDentist]);

        return rows || 0; // Retorna el conteo de pacientes
    } catch (error) {
        throw new Error('Error al consultar la base de datos');
    }
};
