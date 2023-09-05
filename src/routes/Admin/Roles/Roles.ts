import sequelize from 'sequelize'
import { connection } from "../../../database/database";
import { TypeRoles } from '../Type_roles/TypeRoles';


export const Roles = connection.define('roles', {
    delete_user: {
        type: sequelize.BOOLEAN,
    },
    update_user: {
        type: sequelize.BOOLEAN,
    },
    delete_article: {
        type: sequelize.BOOLEAN,
    },

})

Roles.sync({force: false})
