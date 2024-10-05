import { NextFunction, Request, Response, Router } from 'express'
import { addUser, getUsers } from '../services/user.service'
import { UserCreate } from '../models/user.model'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await getUsers())
  } catch (error) {
    next(error)
  }
})

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tempUser: UserCreate = {
      email: 'someoune@exampls.com',
      first_name: 'John',
      last_name: 'Doe',
      user_id: 1,
    }

    console.log('creating user...')
    const createdUser = await addUser(tempUser)
    console.log('created user:')
    console.log(createdUser)
    res.json({ status: 'success' })
  } catch (error) {
    next(error)
  }
})

export default router
