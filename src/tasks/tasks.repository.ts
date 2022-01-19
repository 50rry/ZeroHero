import { EntityRepository, Repository } from "typeorm";
import { Tasks } from "./task.entity";

@EntityRepository(Tasks)
export class TasksRepository extends Repository<Tasks>{
  /*async getAll(firstName, lastName): Promise<Tasks[]>{
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  }*/

}