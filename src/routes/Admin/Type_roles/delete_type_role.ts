import { Roles } from "../Roles/Roles";
import { TypeRoles } from "./TypeRoles";

export async function delete_typerole(typeRoleId: number): Promise<boolean> {
    try {
        // First, find the TypeRoles entry by its ID
        const typeRoleToDelete = await TypeRoles.findOne({
            where: {
                id: typeRoleId
            }
        });

        if (!typeRoleToDelete) {
            console.error("Type role not found.");
            return false;
        }

        // Find and delete the associated Roles entry
        const deletedRoles = await Roles.destroy({
            where: {
                id: typeRoleToDelete.roleId
            }
        });

        if (deletedRoles === 0) {
            console.error("Associated roles not found or could not be deleted.");
            return false;
        }

        // Finally, delete the TypeRoles entry
        await typeRoleToDelete.destroy();

        return true;
    } catch (err) {
        console.error("Error while deleting type role:", err);
        return false;
    }
}
