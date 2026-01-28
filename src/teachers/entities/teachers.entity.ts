import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column({ default: 'FULL TIME' })
  contractType!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Subject, (subject) => subject.teacher)
  subjects!: Subject[];
}