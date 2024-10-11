import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserRole } from '../enums/user-role'

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

    const hasPermission =
      permissionsArray.some(permission => req.permissions.includes(permission)) ||
      permissionsArray.some(permission => permission === UserRole.USER)
    if (!hasPermission) {
      return res.status(403).json({ message: 'Insufficient permissions' })
    }

    next()
  }

declare global {
  namespace Express {
    interface Request {
      permissions: string[]
      userEmail: string
    }
  }
}

export { checkPermissions }
