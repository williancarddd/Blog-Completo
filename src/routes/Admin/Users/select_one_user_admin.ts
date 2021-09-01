import { Model } from "sequelize/types";
import { User } from "./Users";
interface ISearchUser {
  err: boolean
  data_user?: Model<any, any> | null
  name?: string 
}
export async function select_one_user(email: string): Promise<ISearchUser> {
  try {
    const result  = await User.findOne({
    where: {email: email}
    })
    return {err: false, data_user: result}
  } catch(err) {
    return {err: true, name: err.name}
  }
}