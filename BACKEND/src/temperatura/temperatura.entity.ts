import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'datos' }) //nombre de la tabla de la bd
export class Temperatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  temp: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;
}
