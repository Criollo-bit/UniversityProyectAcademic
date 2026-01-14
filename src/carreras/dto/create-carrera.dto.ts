import { IsNotEmpty } from "class-validator"; 
export class CreateCarreraDto { 
  @IsNotEmpty()
  nombre!: string;
}
