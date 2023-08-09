import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Tag } from './Tag';

@Entity({ name: 'topic' })
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  title!: string;

  @Column()
  image!: string;

  @Column()
  userName!: string;

  @Column()
  viewTotal!: number;

  @OneToOne(() => Tag)
  @JoinColumn({ name: 'tagId', referencedColumnName: 'id' })
  tag!: Tag;

  @Column()
  commentTotal!: number;

  @Column()
  content!: string;

  @Column()
  summary!: string;

  @Column({ type: 'datetime' })
  lastReplyTime!: string;

  @Column({ type: 'datetime' })
  postTime!: string;

  // @OneToOne(() => TopicFavorite0)
  // @JoinColumn({ name: 'id', referencedColumnName: 'topicId' })
  // topicFavorite0!: TopicFavorite0;
}
