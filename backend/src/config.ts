import * as dotenv from 'dotenv'

dotenv.config()

if (
  !process.env.PORT ||
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_NAME ||
  !process.env.DB_PASS ||
  !process.env.DB_PORT
) {
  console.error('Error: some or all environment variables are not set!')
  process.exit(1)
}

const config = {
  PORT: parseInt(process.env.PORT as string, 10),
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: parseInt(process.env.DB_PORT as string, 10),
}

console.log('Environment variables are set!')
console.log('PORT:', config.PORT)
console.log('DB_HOST:', config.DB_HOST)
console.log('DB_USER:', config.DB_USER)
console.log('DB_NAME:', config.DB_NAME)
console.log('DB_PASS:', config.DB_PASS)
console.log('DB_PORT:', config.DB_PORT)

export default config
