import { IsNotEmpty, IsEmail, IsString, IsNumber } from "class-validator"; 

export class CreateStudentDto {
  @IsNotEmpty() 
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsNumber()
  careerId!: number;
}