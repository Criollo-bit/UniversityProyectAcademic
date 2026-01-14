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
    const user = { userId: 1, username: 'admin', password: 'hashed_password' }; // Simulación
    
    // Lógica para comparar la contraseña (usando bcrypt en un caso real)
    if (user && pass === '123456') { // Simulación de validación
      const { password, ...result } = user;
      return result; 
    }
    return null;
  }


  async login(user: any) {
    const payload: JwtPayload = { username: user.username, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload), // Genera el token
    };
  }
}