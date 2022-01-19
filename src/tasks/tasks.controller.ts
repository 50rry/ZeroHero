import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Tasks } from "./task.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly taskService: TasksService) {
  }

  @Get("/:id")
  getOne(@Param("id") p: string, @GetUser() user: User,): Promise<Tasks> {
    return this.taskService.getOne(p, user);
  }


  @Get()
  getAll(@GetUser() user: User) {
    return this.taskService.getAll(user);
  }

  @Post()
  postOne(@Body() bd,@GetUser() user: User) {
    return this.taskService.createOne(bd, user);
  }

  @Patch(":id")
  patchOne(@Body() bd,@GetUser() user: User, @Param("id") id: string) {
    return this.taskService.patchOne(id, bd, user);
  }

  @Put(":id")
  putOne(@Body() bd,@GetUser() user: User, @Param("id") id: string) {
    return this.taskService.updateOne(id, bd, user);
  }

  @Delete(":id")
  deleteOne(@Param("id") p: string, @GetUser() user: User) {
    return this.taskService.deleteOne(p, user);
  }
}
