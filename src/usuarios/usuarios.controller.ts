import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common'; // <-- Importar UseGuards
import { AuthGuard } from '@nestjs/passport'; // <-- Importar AuthGuard de Passport
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './create-usuario.dto';
import { UpdateUsuarioDto } from './update-usuario.dto';

// Define el guard de JWT. 'jwt' es el nombre de la estrategia.
const JwtAuthGuard = AuthGuard('jwt');

@Controller('usuarios') // ruta base en plural
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // 1. Proteger POST (Creación de usuario)
  @UseGuards(JwtAuthGuard) 
  @Post()
  create(@Body() data: CreateUsuarioDto) {
    return this.usuariosService.create(data);
  }

  // 2. Proteger GET (Listar todos los usuarios)
  @UseGuards(JwtAuthGuard) 
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  // 3. Proteger GET (Buscar por ID)
  @UseGuards(JwtAuthGuard) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  // 4. Proteger PUT (Actualizar usuario)
  @UseGuards(JwtAuthGuard) 
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, data);
  }

  // 5. Proteger DELETE (Eliminar usuario)
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}