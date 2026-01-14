import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

interface JwtPayload {
  userId: number;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService, 
    private authService: AuthService
  ) {
    super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: configService.get<string>('JWT_SECRET') || 'clavesegurajwt', 
});
  }

  async validate(payload: JwtPayload) {
    
    const user = { userId: payload.userId, username: payload.username, role: 'authenticated' }; 
    
    if (!user) {
      throw new UnauthorizedException('Token inválido o usuario no encontrado.');
    }
    return user; 
  }
}