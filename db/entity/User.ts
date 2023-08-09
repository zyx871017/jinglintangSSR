import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: 'varchar' })
  account!: string;

  @Column()
  allowUserDynamic!: boolean;

  @Column()
  nickname!: string;

  @Column()
  password!: string;

  @Column({ type: 'datetime' })
  registrationDate!: string;
}
