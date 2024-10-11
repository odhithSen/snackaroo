import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getUserByEmail } from '../services/user-info.service'
import { User, UserRead } from '../models/user.model'

interface DecodedToken {
  userEmail?: string
  permissions?: string[]
}

const checkPermissions =
  (allowedPermissions: string | string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const permissionsArray: string[] =
      typeof allowedPermissions === 'string' ? [allowedPermissions] : allowedPermissions

    const authHeader = req.headers['authorization']

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Token missing' })
    }

    const decoded = jwt.decode(token) as DecodedToken
    req.permissions = decoded?.permissions || []
    req.userEmail = decoded?.userEmail || ''

    const hasPermission = permissionsArray.some(permission => req.permissions.includes(permission))
    if (!hasPermission) {
      return res.status(403).json({ message: 'Insufficient permissions' })
    }

    const user: User | null = await getUserByEmail(req.userEmail)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    req.user = user.dataValues

    next()
  }

declare global {
  namespace Express {
    interface Request {
      permissions: string[]
      userEmail: string
      user: UserRead
    }
  }
}

export default checkPermissions
