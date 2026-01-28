import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, IsEmail } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  contractType?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  careerId?: number;
}