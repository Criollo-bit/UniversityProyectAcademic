import { 
    Controller, 
    Post, 
    Body, 
    HttpCode, 
    HttpStatus,
    UnauthorizedException,
    Get, 
    UseGuards, 
    Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

import { AuthService } from './auth.service';


class LoginDto { 
    username!: string; 
    password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // 1. Validar credenciales
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    

    return this.authService.login(user);
  }
  @UseGuards(AuthGuard('jwt')) 
  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user; 
  }
}