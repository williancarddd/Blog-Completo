import bCrypt from 'bcryptjs'

export async  function encode_crypto_hash(password: string): Promise<string> {
  const salt =  await bCrypt.genSalt(8)
  const hash =  bCrypt.hashSync(password, salt)
  return hash
}

export function compare_passwords(pass_hash: string, password: string) {
  return bCrypt.compareSync(password, pass_hash)
}