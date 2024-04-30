import {
  DecryptedTokenPayload,
  Encrypter,
} from '@/domain/delivery/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(
    payload: Record<string, unknown>,
    expiresIn?: string,
  ): Promise<string> {
    if (!payload.exp) {
      const exp = expiresIn
        ? Math.floor(Date.now() / 1000) + 3600
        : Math.floor(Date.now() / 1000)
      payload = { ...payload, exp }
    }

    return JSON.stringify(payload)
  }

  async decrypt(token: string): Promise<DecryptedTokenPayload> {
    const decoded = JSON.parse(token)
    if (typeof decoded.sub === 'string' && typeof decoded.exp === 'number') {
      return decoded as DecryptedTokenPayload
    } else {
      throw new Error('Invalid token format')
    }
  }
}
