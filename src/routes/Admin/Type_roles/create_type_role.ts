import { Roles } from "../Roles/Roles";
import { TypeRoles } from "./TypeRoles";

interface ICreateTypeRole {
    name: string;
    roles: {
        delete_user: boolean;
        update_user: boolean;
        delete_article: boolean;
    };
}

export async function create_typerole(newRole: ICreateTypeRole): Promise<ICreateTypeRole | null> {
    const { name, roles } = newRole;

    try {
        const createdRoles = await Roles.create({
            delete_user: roles.delete_user,
            update_user: roles.update_user,
            delete_article: roles.delete_article
        });
        const createdTypeRole = await TypeRoles.create({
            name: name,
            roleId: createdRoles.id,
        });


        return createdRoles;
    } catch (err) {
        console.error("Erro ao criar novo papel:", err);
        return null;
    }
}
