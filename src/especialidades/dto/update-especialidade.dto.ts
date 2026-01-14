import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecialidadDto } from './create-especialidade.dto';

export class UpdateEspecialidadDto extends PartialType(CreateEspecialidadDto) {}
