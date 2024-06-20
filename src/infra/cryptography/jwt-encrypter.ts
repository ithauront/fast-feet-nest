import {
  DecryptedTokenPayload,
  Encrypter,
} from '@/domain/delivery/application/cryptography/encrypter'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}
  async encrypt(
    payload: Record<string, unknown>,
    expiresIn: string,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, { expiresIn })
  }

  async decrypt(token: string): Promise<DecryptedTokenPayload> {
    try {
      return this.jwtService.verifyAsync(
        token,
      ) as Promise<DecryptedTokenPayload>
    } catch (error) {
      throw new Error('Invalid or expired token')
    }
  }
}
