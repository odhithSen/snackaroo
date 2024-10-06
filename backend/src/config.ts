import * as dotenv from 'dotenv'

dotenv.config()

if (
  !process.env.PORT ||
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_NAME ||
  !process.env.DB_PASS ||
  !process.env.DB_PORT ||
  !process.env.AUTH0_DOMAIN ||
  !process.env.AUTH0_AUDIENCE
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
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
}

console.info('Environment variables are set!')

export default config
