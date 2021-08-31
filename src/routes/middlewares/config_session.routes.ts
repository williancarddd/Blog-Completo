import session from 'express-session'

export default {
  config: session({
    secret:'saladaMista',
    cookie: {
      maxAge: 30000 // tempo de teste
    }
  })
}