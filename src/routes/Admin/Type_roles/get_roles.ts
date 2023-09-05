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

export async function get_all_typeroles(): Promise<ITypeRole[]> {
    try {
        const typeRoles = await TypeRoles.findAll();
        const allTypeRoles: ITypeRole[] = []

        for (const typeRole of typeRoles) {
            const role = await Roles.findOne({
                where: {
                    id: typeRole.roleId
                }
            });

            if (!role) {
                console.error("Role not found.");
                continue;
            }

            allTypeRoles.push({
                name: typeRole.name,
                typeRoleId: typeRole.id,
                roles: {
                    delete_user: role.delete_user,
                    update_user: role.update_user,
                    delete_article: role.delete_article
                }
            });
            
        }

        return allTypeRoles;
    } catch (err) {
        console.error("Erro ao buscar todos os papéis:", err);
        return [];
    }
}
