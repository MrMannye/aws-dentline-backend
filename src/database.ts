import { createPool } from "mysql2/promise";

let host: string = process.env.DB_HOST || 'localhost';
let user: string = process.env.DB_USER || 'root';
let password: string = process.env.DB_PASSWORD || '123456789';
let database: string = process.env.DB_DATABASE || 'DentLine';
let port: number = parseInt(process.env.DB_PORT ?? '3306');

const db = createPool({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
    connectionLimit: 10,
    typeCast: (field, next) => {
        // Convertir los valores BLOB o STRING devueltos como Buffer en cadenas de texto legibles
        if (field.type === "BLOB" || field.type === "VAR_STRING") {
            const value = field.string();
            return value !== null ? value : next();
        }
        return next();
    }
});

export default db;
