import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMatriculaDto {
  @IsNumber()
  @IsNotEmpty()
  estudianteId!: number;

  @IsNumber()
  @IsNotEmpty()
  materiaId!: number;   
  @IsString()
  @IsNotEmpty()
  periodoAcademico!: string; // Ejemplo: "2024-I"
}