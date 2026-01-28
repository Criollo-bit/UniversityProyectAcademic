import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Career } from '../../careers/entities/career.entity'; 

@Entity()
export class Student { 
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; 

  @Column({ unique: true })
  email!: string;

  @Column({ default: 'ACTIVO' })
  status!: string; 

  @ManyToOne(() => Career, (career) => career.students)
  career!: Career;
}