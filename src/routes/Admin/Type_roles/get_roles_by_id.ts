import { Console } from "console";
import { Roles } from "../Roles/Roles";
import { TypeRoles } from "./TypeRoles";

interface ITypeRole {
    name: string;
    typeRoleId: number;
    roles: {
        delete_user: boolean;
        update_user: boolean;
        delete_article: boolean;
    };
}

export async function get_roles_by_id(roleID: number): Promise<ITypeRole | null> {
    try {
        console.log(roleID)
        let allTypeRoles: ITypeRole = []
        const typeRoles = await TypeRoles.findOne({
            where: {
                id: roleID
            }
        });

        
        const role = await Roles.findOne({
            where: {
                id: typeRoles.roleId
            }
        });

        allTypeRoles = {
            name: typeRoles.name,
            typeRoleId: typeRoles.id,
            roles: {
                delete_user: role.delete_user,
                update_user: role.update_user,
                delete_article: role.delete_article
            }
        }
        return allTypeRoles;
    } catch (err) {
        console.error("Erro ao buscar todos os papéis:", err);
        return null;
    }
}
