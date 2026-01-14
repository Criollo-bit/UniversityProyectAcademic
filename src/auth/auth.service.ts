import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
interface JwtPayload {
  userId: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

 
  async validateUser(username: string, pass: string): Promise<any> {
    const user = { userId: 1, username: 'admin', password: 'hashed_password' };
    
    // Lógica para comparar la contraseña
    if (user && pass === '123456') {
      const { password, ...result } = user;
      return result; 
    }
    return null;
  }


  async login(user: any) {
    const payload: JwtPayload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}