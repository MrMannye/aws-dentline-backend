import express from 'express';

import { getHoursDisable, putAbono } from './controller';

const router = express.Router();


router.post('/getHoursDisable', async (req, res) => {
	try {
		console.log(req.body)
		const result = await getHoursDisable(req.body.date)
		res.status(200).json({ data: result })
	} catch (error) {
		res.status(500).json({ error: error })
	}
})

router.put('/updateAbono', async (req, res) => {
	try {
		console.log(req.body)
		const result = await putAbono(req.body)
		console.log(result)
		res.status(200).json({ data: result })
	} catch (error) {
		res.status(500).json({ error: error })
	}
})


export default router;