import sequelize from 'sequelize'
import { connection } from "../../../database/database";

const Categorie = connection.define('categories', {
  title: {
    type: sequelize.TEXT,
    allowNull: false
  }, 
  slug: {
    type: sequelize.TEXT,
    allowNull: false,
  }
})

Categorie.sync({force: false})
export {Categorie}