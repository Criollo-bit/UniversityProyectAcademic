import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Importamos el servicio de usuarios

interface JwtPayload {
  userId: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService, // Inyectamos el servicio
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // Buscamos al usuario real en la base de datos
    const user = await this.usersService.findByUsername(username);
    
    // Comparamos con la contraseña que enviaste (password123)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result; 
    }
    return null;
  } 

  async login(user: any) {
    // Usamos el ID real de la base de datos (user.id)
    const payload: JwtPayload = { username: user.username, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}