import express from 'express'
import { getDentist } from './controller'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const result = await getDentist(req.params.id)
    res.status(200).json({data: result})
  } catch (error) {
    
  }
})

export default router