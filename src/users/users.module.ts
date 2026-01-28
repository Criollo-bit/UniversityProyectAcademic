import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaMainService } from '../prisma/prisma--main.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    PrismaMainService
  ],
  exports: [UsersService],
})
export class UsersModule {}