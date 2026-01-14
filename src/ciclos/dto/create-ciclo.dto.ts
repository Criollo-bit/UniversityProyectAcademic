import { IsNotEmpty } from "class-validator"; 

export class CreateCicloDto {
  @IsNotEmpty() 
  nombre!: string;
}
