import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  email?: string;

  @Column({
    nullable: true,
  })
  password?: string;

  @Column({
    nullable: true,
  })
  googleId?: string;

  @Column({
    default: 'user',
  })
  roles: string;
}
