import { Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import { EncryptService } from './encrypt.service';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Token } from '../interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly encryptService: EncryptService,
  ) {}

  async signIn(user: CreateUserDto): Promise<{ token: string }> {
    const { email, password } = user;

    const userFound = await this.usersService.findByEmail(email);
    if (!userFound) {
      throw new Error('email or pasword invalid');
    }

    const passwordMatch = await this.encryptService.check(
      password,
      userFound.password,
    );

    if (!passwordMatch) {
      throw new Error('email or pasword invalid');
    }

    const payload: Token = {
      sub: userFound.id,
      email: userFound.email,
    };

    const token = await this.tokenService.generateToken(payload);

    return { token };
  }

  async signUp(user: CreateUserDto) {
    try {
      return await this.usersService.create(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
