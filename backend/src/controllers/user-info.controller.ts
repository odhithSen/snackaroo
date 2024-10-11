import { NextFunction, Request, Response, Router } from 'express'
import HttpException from '../models/http-exception.model'
import Ajv, { JSONSchemaType } from 'ajv'
import addFormats from 'ajv-formats'
import { User, UserCreate } from '../models/user.model'
import { addUser, getUserByEmail } from '../services/user-info.service'
import { DecodedToken } from 'jwks-rsa'
import jwt from 'jsonwebtoken'

const ajv = new Ajv()
addFormats(ajv)
const router = Router()

router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' })
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Token missing' })
  }

  const decoded = jwt.decode(token) as DecodedToken
  // @ts-ignore
  req.userEmail = decoded?.userEmail || ''

  const user: User | null = await getUserByEmail(req.userEmail)
  if (!user) {
    return res
      .status(404)
      .json({ message: 'User authenticated but not found, please register the user' })
  }

  return res.status(200).json({ status: 'success', user })
})

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' })
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Token missing' })
  }

  const decoded = jwt.decode(token) as DecodedToken
  // @ts-ignore
  const email = decoded?.userEmail || ''

  try {
    const { first_name, last_name, contact_number, profile_picture_url } = req.body

    const newUser: UserCreate = {
      user_id: 0,
      first_name,
      last_name,
      email,
      contact_number,
      profile_picture_url,
    }

    const userCreateSchema: JSONSchemaType<UserCreate> = {
      type: 'object',
      properties: {
        user_id: { type: 'integer' },
        first_name: {
          type: 'string',
          minLength: 2,
        },
        last_name: {
          type: 'string',
          minLength: 2,
        },
        email: {
          type: 'string',
          format: 'email',
        },
        contact_number: {
          type: 'string',
          minLength: 9,
        },
        profile_picture_url: {
          type: 'string',
          format: 'uri',
        },
      },
      required: [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'contact_number',
        'profile_picture_url',
      ],
      additionalProperties: false,
    }

    const validate = ajv.compile(userCreateSchema)
    const valid = validate(newUser)
    if (!valid) {
      console.error(validate.errors)
      throw new HttpException(400, 'Invalid request body')
    }

    const createdUser = await addUser(newUser)
    res.status(201).json({ status: 'success', data: createdUser })
  } catch (error) {
    next(error)
  }
})

export default router
