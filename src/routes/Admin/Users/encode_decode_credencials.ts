import bCrypt from 'bcryptjs'

export async  function encode_crypto_hash(password: string): Promise<string> {
  const salt =  await bCrypt.genSalt(8)
  const hash =  bCrypt.hashSync(password, salt)
  return hash
}

export function compare_passwords(pass_hash: string, pass_string: string) {

}