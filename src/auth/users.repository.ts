import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

  async createOne(body): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(body.password, salt);
    const user = this.create({ username: body.username, password: hashedPass });
    await this.save(user);
  }

}