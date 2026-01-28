import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNumber()
  @IsNotEmpty()
  studentId!: number;

  @IsNumber()
  @IsNotEmpty()
  subjectId!: number;   

  @IsString()
  @IsNotEmpty()
  academicPeriod!: string;
}