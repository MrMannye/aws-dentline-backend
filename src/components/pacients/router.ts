import express from 'express'
import { getPacientProfile, putPacientProfile, getHistoryPacient, getVitalSigns, putVitalSigns, postRecapDate, getDateById } from './controller'

const router = express.Router()

router.get('/:id', async (req, res) => {
	try {
		const result = await getPacientProfile(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.get('/history/:id', async (req, res) => {
	try {
		const result = await getHistoryPacient(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.get('/vitalSigns/:id', async (req, res) => {
	try {
		const result = await getVitalSigns(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.get('/getDateById/:id', async (req, res) => {
	try {
		const result = await getDateById(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.put('/updatePacientProfile', async (req, res) => {
	try {
		const result = await putPacientProfile(req.body)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.put('/updateVitalSigns', async (req, res) => {
	try {
		console.log(req.body)
		const result = await putVitalSigns(req.body)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.post('/postRecapDate', async (req, res) => {
	try {
		const result = await postRecapDate(req.body)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

export default router