import express from 'express'
import { getDentist, postDentist, putDentist, getNextDates, getAllPacients, getAllDates, getAllDatesRecap} from './controller'

const router = express.Router()

router.get('/:id', async (req, res) => {
	try {
		const result = await getDentist(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.get('/nextDate/:id', async (req, res) => {
	try {
		const result = await getNextDates(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.get('/allPacients/:id', async (req, res) => {
	try {
		const result = await getAllPacients(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.get('/allDates/:id', async (req, res) => {
	try {
		const result = await getAllDates(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.get('/allDatesRecap/:id', async (req, res) => {
	try {
		const result = await getAllDatesRecap(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.post('/', async (req, res) => {
	try {
		const result = await postDentist(req.body)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.put('/updateDentist', async (req, res) => {
	try {
		const result = await putDentist(req.body)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

export default router