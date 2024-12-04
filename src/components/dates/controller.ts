import { CitaRecap } from "../../types"
import { getDateByIdDate } from "../pacients/database"
import { getHoursDisableDB, putAbonoDB } from "./database"

export const getHoursDisable = async (date: Date) => {
	try {
		const allHours = await getHoursDisableDB(date)
		return allHours
	} catch (error) {
		return error
	}
}

export const putAbono = async (body: any) => {
	try {
		// Primero, obtén los valores actuales de la cita
		const rows: any = await getDateByIdDate(body.id_cita);
		const cita = rows[0] as CitaRecap;

		const abono = parseFloat(body.abono);
		// Verifica si el nuevo abono excedería el costo total
		if (cita.abono + abono > cita.costo_total) {
			throw new Error("El abono no puede exceder el costo total");
		}
		const result: any = await putAbonoDB(body.abono, body.id_cita)
		result.message = {
			response: result.affectedRows ? "Abono actualizado" : "No se pudo actualizar el abono",
			isAbonoEqualCosto: (cita.abono + abono) === cita.costo_total
		}
		return result
	} catch (error) {
		return error
	}
}