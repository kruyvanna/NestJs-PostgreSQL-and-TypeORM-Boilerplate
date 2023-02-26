import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Member, (member) => member.photos)
  member: Member;
}
