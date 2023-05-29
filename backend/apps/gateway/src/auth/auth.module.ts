import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthMiddleware],
  exports: [AuthMiddleware]
})
export class AuthModule {}
