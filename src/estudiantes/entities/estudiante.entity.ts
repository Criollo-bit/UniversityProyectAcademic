import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Carrera } from '../../carreras/entities/carrera.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: 'ACTIVO' }) // Para la Parte 1 y 2
  estado!: string;

  @ManyToOne(() => Carrera, (carrera) => carrera.estudiantes)
  carrera!: Carrera;
}