import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/JWTauthentication/jwtConstants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secretKey,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [ AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
