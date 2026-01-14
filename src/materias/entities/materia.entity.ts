import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Carrera } from '../../carreras/entities/carrera.entity';
import { Maestro } from '../../maestros/entities/maestro.entity';

@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ default: 30 })
  cupos!: number;

  @ManyToOne(() => Carrera, (carrera) => carrera.materias)
  carrera!: Carrera;

  @ManyToOne(() => Maestro, (maestro) => maestro.materias)
  maestro!: Maestro;
}