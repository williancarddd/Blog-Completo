import session from 'express-session'
import 'dotenv/config'

export default {
  config: session({
    secret:process.env.SECRET_SESSION || 'CARAMELO',
    cookie: {
      maxAge: 7.2e+6 // 2 horas
    }
  })
}