import { get } from "http";
import { User } from "./Users";
import { get_roles_by_id } from "../Type_roles/get_roles_by_id";

interface ISelectAllUsers {
  err: boolean
  name?: string
  data_users?: Object
}

export async function select_all_users_admin(): Promise<ISelectAllUsers> {
  try {
    const result = await User.findAll()
    for(let i = 0; i < result.length; i++){
      if(!result[i].dataValues.TypeRoleId) result[i].dataValues.roles = "no role"
      else {
        const roless = await get_roles_by_id(result[i].dataValues.TypeRoleId)
        const result_type_role = roless?.name
        
        result[i].dataValues.roles = result_type_role 
      }
    
    }
    return {err: false, data_users: result}
  } catch(Err) {
    return {err: true, name: Err.name}
  }
}