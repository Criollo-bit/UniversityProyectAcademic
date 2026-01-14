import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';
import { Materia } from '../../materias/entities/materia.entity';

@Entity()
export class Carrera {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.carrera)
  estudiantes!: Estudiante[];

  @OneToMany(() => Materia, (materia) => materia.carrera)
  materias!: Materia[];
}