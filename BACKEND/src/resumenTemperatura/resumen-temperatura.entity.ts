import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'resumen_temperatura' })
export class ResumenTemperatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  max: number;

  @Column('float')
  min: number;

  @Column('float')
  promedio: number;

  @Column({ type: 'timestamp' }) // o simplemente 'date' si no quieres hora
  fecha: Date;

  @Column('int')
  cantidad: number; // 👈 este campo es obligatorio para tu lógica
}
