import express from 'express'
import { getPacientProfile, putPacientProfile, getHistoryPacient, getVitalSigns, putVitalSigns} from './controller'

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

router.put('/udatePacientProfile', async (req, res) => {
	try {
		const result = await putPacientProfile(req.body)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.put('/udateVitalSigns', async (req, res) => {
	try {
		const result = await putVitalSigns(req.body)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

export default router