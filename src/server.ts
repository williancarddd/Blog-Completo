import express from 'express'
import 'dotenv/config'
import { morgan_configured } from './routes/middlewares/morgan.routes'
import { routers } from './routes/index.routes'
import  './database/database'
import  './routes/Admin/Articles/Article'
import  './routes/Admin/Categories/Categorie'
import  './routes/Admin/Users/Users'
const app = express()

app.set("view engine", 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan_configured)
app.use(routers)

app.listen(process.env.PORT || 3000, ():void => {
  console.log('👍 server listen PORT:'+ process.env.PORT)
})