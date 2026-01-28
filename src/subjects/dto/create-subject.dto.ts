import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsNotEmpty()
  @IsNumber()
  careerId!: number;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsNumber()
  teacherId?: number;
}