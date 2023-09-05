import { Model } from "sequelize/types";
import { User } from "./Users";
import { TypeRoles } from "../Type_roles/TypeRoles";
import { get_roles_by_id } from "../Type_roles/get_roles_by_id";
interface ITypeRole {
  name: string;
  typeRoleId: number;
  roles: {
      delete_user: boolean;
      update_user: boolean;
      delete_article: boolean;
  };
}
interface ISearchUser {
  err: boolean
  data_user?: Model<any, any> | null
  name?: string
  roles?: ITypeRole
}
export async function select_one_user(email: string): Promise<ISearchUser> {
  try {
    const result  = await User.findOne({
    where: {email: email}
    })
    
    const result_type_role = await get_roles_by_id(result?.dataValues.TypeRoleId)
    if(result_type_role){
      return {err: false, data_user: result, roles: result_type_role}
    }
    return {err: false, data_user: result}
  } catch(err) {
    return {err: true, name: err.name}
  }
}
