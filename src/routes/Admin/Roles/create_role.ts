import { Roles } from "./Roles";

interface ICreateNewRole {
    delete_user: boolean;
    delete_article: boolean;
    delete_category: boolean;
    update_user: boolean;
    update_article: boolean;
    update_category: boolean;
    create_user: boolean;
    create_article: boolean;
    create_category: boolean;
    read_user: boolean;
    read_article: boolean;
    read_category: boolean;
}

export async function create_role(newRole: ICreateNewRole): Promise<ICreateNewRole | null> {
    try {
        const createdRole = await Roles.create({
            delete_user: newRole.delete_user,
            delete_article: newRole.delete_article,
            delete_category: newRole.delete_category,
            update_user: newRole.update_user,
            update_article: newRole.update_article,
            update_category: newRole.update_category,
            create_user: newRole.create_user,
            create_article: newRole.create_article,
            create_category: newRole.create_category,
            read_user: newRole.read_user,
            read_article: newRole.read_article,
            read_category: newRole.read_category,
        });
        console.log("Nova regra criada:", createdRole.toJSON());
        return newRole;
    } catch (err) {
        console.error("Erro ao criar nova função:", err);
        return null
    }
}
