import { connection } from "../../../database/database";
import sequelize  from 'sequelize';

export const TypeRoles:sequelize.ModelCtor<sequelize.Model<any, any>> = connection.define("TypeRoles", {
  name: {
    type: sequelize.STRING,
    allowNull: false,
  }
})


TypeRoles.sync({force: false})