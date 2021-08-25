import sequelize from 'sequelize'
import { connection } from "../../../database/database";
import { Categorie } from '../Categories/Categorie';

const Article = connection.define('articles', {
  title: {
    type: sequelize.TEXT,
    allowNull: false
  }, 
  slug: {
    type: sequelize.STRING,
    allowNull: false
  },
  body_article: {
    type: sequelize.TEXT,
    allowNull: false
  },
  thumbnail_url: {
    type: sequelize.TEXT,
    allowNull: false
  }
})

Article.belongsTo(Categorie)
Categorie.hasMany(Article)

Article.sync({force: false})

export {Article}