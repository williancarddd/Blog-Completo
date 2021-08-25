import sequelize from 'sequelize'
import { Sequelize } from 'sequelize'
import 'dotenv/config'
import {DateTime} from 'luxon';

const connection:sequelize.Sequelize = new Sequelize(process.env.DATABASE || '',  process.env.USER || '', process.env.PASSWORD || '', {
  dialect: 'mysql',
  host:'localhost',
  timezone: DateTime.now().toSQL().split(' ')[2]
})


connection.
authenticate()
.then(() => {
  console.log('😴 connected to database ' + process.env.DATABASE)
})
.catch(()=>{
  console.log('🤷‍♂️ error to connect database ')
})
import '../routes/Admin/Categories/Categorie';
import '../routes/Admin/Articles/Article';
export {connection}