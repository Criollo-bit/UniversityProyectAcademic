import { IsNotEmpty } from "class-validator"; 

    
export class CreateEspecialidadDto {
  @IsNotEmpty()
  nombre!: string;
}
