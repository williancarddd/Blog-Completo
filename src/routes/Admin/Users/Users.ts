import { connection } from "../../../database/database";
import sequelize  from 'sequelize';
import { TypeRoles } from "../Type_roles/TypeRoles";

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


TypeRoles.hasMany(User);
User.sync({force: false})