import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('double precision')
  co2PerGO: number;

  @Column('bool')
  renewable: boolean;

  @UpdateDateColumn()
  updatedAt: Date;
}
