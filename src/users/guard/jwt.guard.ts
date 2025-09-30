import {
  CanActivate,
  UnauthorizedException,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { jwtConstants } from '../../auth/JWTauthentication/jwtConstants';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGUARD implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.jwtVerification(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secretKey,
      });
      console.log(request['user'] = payload);
    } catch {
      throw new ForbiddenException();
    }
     const userRole=request['user'].user_role;

     console.log(userRole === 'admin')
     if(userRole === 'admin'){
      return true;
     } 
    return false;
  }

  private jwtVerification(request: Request): string | undefined {
    const authorHeader = request.headers['authorization'];
    return authorHeader && authorHeader.startsWith('Bearer')
      ? authorHeader.split(' ')[1]
      : undefined;
  }
}
