import { connection } from "../../../database/database";
import sequelize  from 'sequelize';
import { Roles } from "../Roles/Roles";


export const TypeRoles:sequelize.ModelCtor<sequelize.Model<any, any>> = connection.define("TypeRoles", {
  name: {
    type: sequelize.STRING,
    allowNull: false,
  }
})

Roles.hasMany(TypeRoles);
TypeRoles.sync({force: false})