import { getHoursDisableDB } from "./database"

export const getHoursDisable = async (date: Date) => {
	try {
		const allHours = await getHoursDisableDB(date)
		return allHours
	} catch (error) {
		return error
	}
}