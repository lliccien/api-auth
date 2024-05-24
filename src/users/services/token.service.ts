import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/services/config.service';
import { Token } from '../interfaces/token.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(payload: Token): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<Token> {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.verifyAsync<Token>(token, {
      secret,
    });
  }
}
