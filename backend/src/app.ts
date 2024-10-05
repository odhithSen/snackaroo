import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'

import routes from './routes/routes'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(routes)

app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'Snackaroo API is running on /api' })
})

export default app
