import express from 'express'
import { getDentist, postDentist, putDentist } from './controller'

const router = express.Router()

router.get('/:id', async (req, res) => {
	try {
		const result = await getDentist(req.params.id)
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

router.put('/:id', async (req, res) => {
	try {
		const result = await putDentist(req.params.id)
		res.status(200).json({ data: result })
	} catch (error) {

	}
})

export default router