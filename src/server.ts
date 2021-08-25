import express from 'express'
import 'dotenv/config'
import { morgan_configured } from './routes/middlewares/morgan.routes'
import { routers } from './routes/index.routes'
import  './database/database'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan_configured)
app.use(routers)

app.listen(process.env.PORT || 3000, ():void => {
  console.log('👍 server listen PORT:'+ process.env.PORT)
})