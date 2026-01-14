// src/materias/dto/create-materia.dto.ts
import { IsNotEmpty } from 'class-validator'
export class CreateMateriaDto {
  @IsNotEmpty()
  nombre!: string;

  @IsNotEmpty()
  carreraId!: number;
}
