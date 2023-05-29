import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('text', { default: '' })
  fullName: string;

  @Column('text', { default: '' })
  userName: string;
}
