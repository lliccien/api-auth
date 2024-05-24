import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { EncryptService } from './services/encrypt.service';
import { UuidService } from './services/uuid.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/services/config.service';
import { TokenService } from './services/token.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
        global: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
    EncryptService,
    UuidService,
    AuthService,
    TokenService,
    AuthGuard,
  ],
  exports: [TokenService, AuthGuard],
})
export class UsersModule {}
