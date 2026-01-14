import { PartialType } from '@nestjs/mapped-types';
import { CreateMaestroDto } from './create-maestro.dto';

export class UpdateMaestroDto extends PartialType(CreateMaestroDto) {}
