import { Module, forwardRef } from '@nestjs/common'; // Agregamos forwardRef
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { JwtStrategy } from './jwt.strategy'; 
import { UsersModule } from '../users/users.module'; // Importamos UsersModule

@Module({
  imports: [ 
    ConfigModule, 
    forwardRef(() => UsersModule), // <--- AGREGA ESTO para resolver la dependencia
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],  
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        const expiresInValue: string | undefined = configService.get<string>('JWT_EXPIRES_IN');

        return {
          secret: configService.get<string>('JWT_SECRET')!, 
          signOptions: { 
            expiresIn: (expiresInValue || '1h') as any, // Cambiado a 1h para que no expire rápido
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}