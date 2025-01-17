import express from 'express';

import { deleteDate, getHoursDisable, putAbono, putDate, putMotivo } from './controller';

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

router.put('/updateDate', async (req, res) => {
	try {
		console.log(req.body)
		const result = await putDate(req.body)
		console.log(result)
		res.status(200).json({ data: result })
	}
	catch (error) {
		res.status(500).json({ error: error })
	}
})

router.delete('/deleteDate/:idDate', async (req, res) => {
	try {
		const { idDate } = req.params; // Obtener el id de la cita
		console.log(idDate);
		const result = await deleteDate(idDate); // Llamada al controller
		if (result.affectedRows > 0) {
			res.status(200).json({ message: 'Cita eliminada exitosamente' });
		} else {
			res.status(404).json({ message: 'Cita no encontrada' });
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
});


router.put('/updateMotivo', async (req, res) => {
	try {
		const result = await putMotivo(req.body)
		res.status(200).json({ data: result })
	}
	catch (error) {
		res.status(500).json({ error: error })
	}
})

export default router;