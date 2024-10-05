import { NextFunction, Request, Response, Router } from 'express'
import { getUsers } from '../services/user.service'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await getUsers())
  } catch (error) {
    next(error)
  }
})

export default router
