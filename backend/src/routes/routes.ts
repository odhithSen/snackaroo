import { Router } from 'express'
import userInfoController from '../controllers/user-info.controller'
import userController from '../controllers/user.controller'
import publicController from '../controllers/public.controller'
import { checkJwt } from '../middleware/authz.middleware'
import checkPermissions from '../middleware/permissions.middleware'
import { UserRole } from '../enums/user-role'

const userInfoApi = Router().use(userInfoController)
const userApi = Router().use(userController)
const publicApi = Router().use(publicController)

const api = Router()
  .use('/user-info', checkJwt, userInfoApi)
  .use('/user', checkJwt, checkPermissions(UserRole.ADMIN), userApi)
  .use('/public', publicApi)

export default Router().use('/api', api)
