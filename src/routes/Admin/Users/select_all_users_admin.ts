import { User } from "./Users";

interface ISelectAllUsers {
  err: boolean
  name?: string
  data_users?: Object
}

export async function select_all_users_admin(): Promise<ISelectAllUsers> {
  try {
    const result = await User.findAll()
    return {err: false, data_users: result}
  } catch(Err) {
    return {err: true, name: Err.name}
  }
}