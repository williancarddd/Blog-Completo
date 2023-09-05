import { Model } from "sequelize/types";
import { User } from "./Users";
import { TypeRoles } from "../Type_roles/TypeRoles";
import { get_roles_by_id } from "../Type_roles/get_roles_by_id";

export async function delete_user(id: number): Promise<null> {
  try {
    
    const result = await User.destroy({
      where: {id: id}
    })
    return null

  } catch(err) {
    return {err: true, name: err.name}
  }
}
