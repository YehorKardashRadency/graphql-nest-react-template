import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { default: '' })
  body: string;

  @Column('text', { default: '' })
  title: string;

  @Column('text')
  authorId: string;
}
