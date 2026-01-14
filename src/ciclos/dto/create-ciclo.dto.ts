// src/ciclos/dto/create-ciclo.dto.ts

import { IsNotEmpty } from "class-validator";

    
export class CreateCicloDto {
  @IsNotEmpty() 
  nombre!: string; // Ejemplo: "2025-I"
}
