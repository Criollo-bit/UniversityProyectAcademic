import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [ 
    ConfigModule, 
    
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        const expiresInValue: string | undefined = configService.get<string>('JWT_EXPIRES_IN');

        return {
          secret: configService.get<string>('JWT_SECRET')!, 
          signOptions: { 
            expiresIn: (expiresInValue || '60s') as any, 
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