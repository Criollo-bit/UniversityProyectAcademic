import { IsNotEmpty } from 'class-validator'
export class CreateMateriaDto {
  @IsNotEmpty()
  nombre!: string;

  @IsNotEmpty()
  carreraId!: number;
}
