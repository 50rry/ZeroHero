import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Exclude} from "class-transformer";
import { User } from "../auth/user.entity";

@Entity()
export class Tasks /*extends BaseEntity*/ {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: boolean;

  @ManyToOne(type => User, user => user.task, { eager: false })
  @Exclude({toPlainOnly: true})
  user: User;

}