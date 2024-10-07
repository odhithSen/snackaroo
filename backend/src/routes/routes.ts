import { Router } from 'express'
import userController from '../controllers/user.controller'
import publicController from '../controllers/public.controller'
import { checkJwt } from '../middleware/authz.middleware'
import checkPermissions from '../middleware/permissions.middleware'
import { UserRole } from '../enums/user-role'

const userApi = Router().use(userController)
const publicApi = Router().use(publicController)

const api = Router()
  .use('/user', checkJwt, checkPermissions(UserRole.ADMIN), userApi)
  .use('/public', publicApi)

export default Router().use('/api', api)
