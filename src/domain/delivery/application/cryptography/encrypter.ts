export interface DecryptedTokenPayload {
  sub: string
  exp: number
}

export abstract class Encrypter {
  abstract encrypt(
    payload: Record<string, unknown>,
    expiresIn: string,
  ): Promise<string>

  abstract decrypt(token: string): Promise<DecryptedTokenPayload>
}
