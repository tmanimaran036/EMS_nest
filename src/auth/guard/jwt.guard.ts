import {
  CanActivate,
  UnauthorizedException,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { jwtConstants } from '../JWTauthentication/jwtConstants';
import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtServices: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.jwtVerification(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: object = await this.jwtServices.verifyAsync(token, {
        secret: jwtConstants.secretKey,
      });

      request['user'] = payload;
    } catch {
      throw new ForbiddenException();
    }
    console.log(request['user']);
    // const roles:Array=[ ]

    if (request['user'].role === 'user') {
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
