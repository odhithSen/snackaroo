import { expressjwt, GetVerificationKey } from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import config from '../config'

export const checkJwt: any = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 20,
    jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as GetVerificationKey,

  audience: config.AUTH0_AUDIENCE,
  issuer: `https://${config.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
})
