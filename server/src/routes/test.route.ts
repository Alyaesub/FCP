import { Router } from 'express'

const router = Router()

//route teste API back
router.get('/test', (req, res) => {
  res.json({ message: 'API opérationnelle OK BG' })
})

export default router


