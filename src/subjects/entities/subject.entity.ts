import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Career } from '../../careers/entities/career.entity';
import { Teacher } from '../../teachers/entities/teachers.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; 

  @Column({ default: 30 })
  capacity!: number; 

  // Relación Muchos a Uno con Career (Carrera)
  @ManyToOne(() => Career, (career) => career.subjects) 
  career!: Career;

  // Relación Muchos a Uno con Teacher (Maestro)
  @ManyToOne(() => Teacher, (teacher) => teacher.subjects) 
  teacher!: Teacher;
}