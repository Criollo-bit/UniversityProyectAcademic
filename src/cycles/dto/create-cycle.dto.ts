import { IsNotEmpty, IsString } from "class-validator"; 

export class CreateCycleDto {
  @IsNotEmpty() 
  @IsString()
  name!: string;
}