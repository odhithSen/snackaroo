import * as dotenv from 'dotenv'

dotenv.config()

import app from './app'

if (!process.env.PORT) {
  console.error('Error: PORT not found in process.env')
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
