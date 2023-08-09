import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Topic } from './Topic';

@Entity({ name: 'topicfavorite_2' })
export class TopicFavorite2 extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'datetime' })
  addtime!: string;

  @Column()
  topicId!: number;

  @OneToOne(() => Topic)
  @JoinColumn({ name: 'topicId', referencedColumnName: 'id' })
  topic!: Topic;
}
