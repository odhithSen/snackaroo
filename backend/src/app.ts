import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'

import routes from './routes/routes'
import HttpException from './models/http-exception.model'
import { UnauthorizedError } from 'express-jwt'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(routes)

app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'Snackaroo API is running on /api' })
})

/* eslint-disable */
app.use(
  (
    err: Error | HttpException | UnauthorizedError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (err instanceof UnauthorizedError) {
      res.status(401).json({ status: 'error', message: err.message })
      return
    }
    // @ts-ignore
    if (err && err.errorCode) {
      // @ts-ignore
      res.status(err.errorCode).json({ status: 'error', message: err?.message })
      console.error(err)
    } else if (err) {
      res
        .status(500)
        .json({ status: 'error', message: err?.message?.toString() || 'Internal server error' })
      console.error(err)
    }
  },
)

export default app
