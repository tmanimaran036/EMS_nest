import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import * as encrypt from  'bcrypt' 
import { jwtConstants } from 'src/auth/JWTauthentication/jwtConstants';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,private authJWT:JwtService) {}

  async signIn(userEmail: string, pass: string): Promise<{ access_token:string }> {
    
   const user = await this.userService.findWithName(userEmail);
   
   if(!user){
      throw new UnauthorizedException('invalid email id !not Found');
   }
    const hashPass= await encrypt.compare(pass,user.password);
    
    if(!hashPass){
      console.log(pass)
      throw new UnauthorizedException('invalid password.provide a valid password');
    }

    const payload ={ user_id:user.id, user_name:user.name ,user_role:user.role};
    return{
        access_token:await this.authJWT.signAsync(payload,{secret:jwtConstants.secretKey}),
    }
  }
}
