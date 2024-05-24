import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './users/guards/auth.guard';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
