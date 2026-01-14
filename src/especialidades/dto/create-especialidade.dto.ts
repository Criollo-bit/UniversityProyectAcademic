// src/especialidades/dto/create-especialidad.dto.ts

import { IsNotEmpty } from "class-validator";

    
export class CreateEspecialidadDto {
  @IsNotEmpty()
  nombre!: string;
}
