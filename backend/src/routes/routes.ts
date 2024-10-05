import { Router } from 'express'

import userController from '../controllers/user.controller'

const userApi = Router().use(userController)

const api = Router().use('/user', userApi)

export default Router().use('/api', api)
