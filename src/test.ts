import crypto from 'crypto'

 function encode_crypto_hash(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('hex')
}

 function compare_passwords(pass_hash: string, pass_string: string) {
  const hash_pass_string = crypto
    .createHash('sha256')
    .update(pass_string)
    .digest('hex')
    if(hash_pass_string == pass_hash) return true;
}

console.log(compare_passwords(encode_crypto_hash('Olá mundo'), 'Olá mundo'))