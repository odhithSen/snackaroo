import { Router } from 'express'
import userInfoController from '../controllers/user-info.controller'
import userController from '../controllers/user.controller'
import publicController from '../controllers/public.controller'
import { checkJwt } from '../middleware/authz.middleware'
import { checkPermissions } from '../middleware/permissions.middleware'
import { UserRole } from '../enums/user-role'
import { extractUser } from '../middleware/extract-user.middleware'

const { ADMIN, RESTAURANT_ADMIN, USER } = UserRole

const userInfoApi = Router().use(userInfoController)
const userApi = Router().use(userController)
const publicApi = Router().use(publicController)

const api = Router()
  .use('/public', publicApi)
  .use('/user-info', checkJwt, checkPermissions([ADMIN, RESTAURANT_ADMIN, USER]), userInfoApi)
  .use('/user', checkJwt, checkPermissions(USER), extractUser, userApi)

export default Router().use('/api', api)
