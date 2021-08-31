import { connection } from "../../../database/database";
import sequelize  from 'sequelize';

export const User:sequelize.ModelCtor<sequelize.Model<any, any>> = connection.define("users", {
  email: {
    type: sequelize.STRING,
    allowNull: false
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  }
})

User.sync({force: false})