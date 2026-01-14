import { Controller, Post, Body, UseGuards, Get} from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  @Post()
  async matricular(@Body() data: any) {
    // Ahora este nombre coincide con el del Service
    return this.matriculasService.matricular(data);
  }

  @Get()
  findAll() {
    return this.matriculasService.findAll();
  }
}