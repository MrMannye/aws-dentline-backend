import db from '../../database'

export const getDentistById = async (idDentist: string) => {
  try {
    const [fileds] = await db.query(`SELECT * FROM dentistas WHERE id_dentista = ${idDentist}`)
    console.log(fileds)
    return "Hola"
  } catch (error) {
    return error
  }
}
