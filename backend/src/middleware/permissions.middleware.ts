import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface DecodedToken {
  permissions?: string[]
}

const checkPermissions =
  (allowedPermissions: string | string[]) => (req: Request, res: Response, next: NextFunction) => {
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

    console.log('checking permissions:', permissionsArray)
    console.log('permissions:', req.permissions)

    const hasPermission = permissionsArray.some(permission => req.permissions.includes(permission))
    if (!hasPermission) {
      return res.status(403).json({ message: 'Insufficient permissions' })
    }

    next()
  }

declare global {
  namespace Express {
    interface Request {
      permissions: string[]
    }
  }
}

export default checkPermissions
