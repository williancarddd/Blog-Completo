import session from 'express-session'
import 'dotenv/config'

export default {
  config: session({
    secret:process.env.SECRET_SESSION || 'CARAMELO',
    cookie: {
      maxAge: 30000 // tempo de teste
    }
  })
}