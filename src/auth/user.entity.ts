import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Tasks } from "../tasks/task.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(
    (type) => Tasks,
    task => task.user,
    { eager: true }
  )
  task: Tasks[];
}