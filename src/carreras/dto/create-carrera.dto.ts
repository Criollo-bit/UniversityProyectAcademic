// src/carreras/dto/create-carrera.dto.ts
import { IsNotEmpty } from "class-validator";
export class CreateCarreraDto {
  @IsNotEmpty()
  nombre!: string;
}
