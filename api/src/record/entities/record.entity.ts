import { Domain } from 'src/domain/entities/domain.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Domain, (domain: Domain) => domain.id)
  domain: Domain;

  @ManyToOne(() => User, (user: User) => user.id)
  user: User;

  @Column()
  gigaOctets: number;

  @Column()
  timeInterval: number;
}
