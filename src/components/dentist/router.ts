import express from 'express'
import { getDentist, postDentist, putDentist, getNextDates, getAllPacients, getAllDates, getAllDatesRecap, getValidDentist, getPatientsCount } from './controller'

const router = express.Router()

router.get('/:id', async (req, res) => {
	try {
		const result = await getDentist(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

router.get('/validDentist/:wallet_address', async (req, res) => {
	try {
		const result = await getValidDentist(req.params.wallet_address)
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

router.get('/countPatients/:idDentist', async (req, res) => {
	try {
		const { idDentist } = req.params; 	
		const count = await getPatientsCount(idDentist); // Llama al controller
		res.status(200).json({ count });
	} catch (error) {
		res.status(500).json({ error: 'Error al contar los pacientes del dentista' });
	}
});

export default router