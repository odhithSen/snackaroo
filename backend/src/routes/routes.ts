import { Router } from 'express'
import userController from '../controllers/user.controller'
import { checkJwt } from '../middleware/authz.middleware'
import checkPermissions from '../middleware/permissions.middleware'
import { UserRole } from '../enums/user-role'

const userApi = Router().use(userController)

const api = Router().use('/user', checkJwt, checkPermissions(UserRole.ADMIN), userApi)

export default Router().use('/api', api)
