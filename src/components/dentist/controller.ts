import { getDentistById } from "./database"


export const getDentist = async (idDentist: string) => {
  try {
    const dentist = getDentistById(idDentist)
    return dentist
  } catch (error) {
    return error
  }
}