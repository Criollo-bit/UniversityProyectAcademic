import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Subject } from '../../subjects/entities/subject.entity';

@Entity()
export class Career {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Student, (student) => student.career)
  students!: Student[];

  @OneToMany(() => Subject, (subject) => subject.career)
  subjects!: Subject[];
}