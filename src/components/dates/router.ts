import express from 'express';

import { getHoursDisable } from './controller';

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

export default router;