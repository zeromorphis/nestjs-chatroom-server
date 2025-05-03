import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  groupId: string;

  @Column()
  userId: string;

  @Column()
  groupName: string;

  @Column({ default: '曾经沧海难为水，除却巫山不是云' })
  notice: string;

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number;
}

@Entity()
export class GroupMap {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  groupId: string;

  @Column()
  userId: string;
}

