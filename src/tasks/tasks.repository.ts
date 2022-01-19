import { EntityRepository, Repository } from "typeorm";
import { Tasks } from "./task.entity";

@EntityRepository(Tasks)
export class TasksRepository extends Repository<Tasks>{

}