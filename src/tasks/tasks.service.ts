import { Injectable, NotFoundException } from "@nestjs/common";
import { Tasks } from "./task.entity";
import { TasksRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { createConnection } from "typeorm";
import { User } from "../auth/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository) {
  }
  async getOne(id: string, user: User): Promise<Tasks> {
    const found = await this.taskRepository.findOne({where: {id, user}});
    if(!found){
      throw new NotFoundException(`Object with id: ${id} not found`);
    }
    return found;
  }

  getAll(user: User) {
    return  this.taskRepository.find({user});
  }
  createOne(body, user: User){
    const tsk = new Tasks()
    tsk.description = body.description;
    tsk.title = body.title;
    tsk.status = body.status;
    tsk.user = user;
    return this.taskRepository.save(tsk);
  }
  async patchOne(id, body, user){
    const tsk = await this.taskRepository.findOne({id, user});
    if(body.status){tsk.status = body.status};
    if(body.description){tsk.description = body.description};
    if(body.title){tsk.title = body.title};
    return await this.taskRepository.update(id, tsk)
  }
  async updateOne(id, body, user) {
    const tsk = await this.taskRepository.findOne({id, user});
    tsk.status = body.status
    tsk.description = body.description
    tsk.title = body.title
    return await this.taskRepository.update(id, tsk)
  }
  deleteOne(id, user){
    const tsk = new Tasks();
    tsk.id = id;
    tsk.user = user
    return this.taskRepository.remove(tsk);
  }
}
