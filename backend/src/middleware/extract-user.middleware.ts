import { Request, Response, NextFunction } from 'express'
import { getUserByEmail } from '../services/user-info.service'
import { User, UserRead } from '../models/user.model'

const extractUser = async (req: Request, res: Response, next: NextFunction) => {
  const userEmail = req?.userEmail
  if (!userEmail) {
    console.error('User email missing. Check the permissions middleware for path: ', req.path)
    return res.status(401).json({ message: 'User email missing' })
  }

  const user: User | null = await getUserByEmail(req.userEmail)
  if (!user) {
    return res.status(401).json({ message: 'User not found' })
  }
  req.user = user.dataValues

  next()
}

declare global {
  namespace Express {
    interface Request {
      user: UserRead
    }
  }
}

export { extractUser }
