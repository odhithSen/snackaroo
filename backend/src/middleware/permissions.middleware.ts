import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface DecodedToken {
  userEmail?: string
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
    req.userEmail = decoded?.userEmail || ''

    // remove this console.log statement before deploying to production
    console.log('checking permissions:', permissionsArray)
    console.log('permissions:', req.permissions)
    console.log('user email:', req.userEmail)

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
      userEmail: string
    }
  }
}

export default checkPermissions
