import { encode_crypto_hash } from "./encode_decode_credencials";
import { User } from "./Users";

interface ICreateNewUserAdmin {
  err: boolean
  name?: string
}
export async function create_new_user_admin(emaill: string, passwordd: string): Promise<ICreateNewUserAdmin> {
  try {
    const pass_encrypted = await encode_crypto_hash(passwordd)
    await User.create({
      email: emaill,
      password: pass_encrypted
    })
    return {err: false}
  } catch(err) {
    return {err: true, name: err.name}
  }

}