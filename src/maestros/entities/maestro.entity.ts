import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Materia } from '../../materias/entities/materia.entity';

@Entity()
export class Maestro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ nullable: true })
  especialidadId!: number;

  @Column({ default: 'TIEMPO COMPLETO' })
  tipoContrato!: string;

  @Column({ default: true })
  estaActivo!: boolean;

  @OneToMany(() => Materia, (materia) => materia.maestro)
  materias!: Materia[];
}