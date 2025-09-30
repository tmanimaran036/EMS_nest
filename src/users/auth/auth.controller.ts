import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGUARD } from '../guard/jwt.guard';
import { loginDto } from '../DTO/authLogin.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(AuthGUARD)
  @Get('profile')
  getProfile(@Request() req:any) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  Signin(@Body() signInDto:loginDto ) {
    return this.auth.signIn(signInDto.userEmail, signInDto.password);
  }
}
