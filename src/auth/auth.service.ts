import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {
  }

  signUp(body): Promise<void> {
    return this.usersRepository.createOne(body);
  }


  async signIn(body) {
    const user = await this.usersRepository.findOne({ username: body.username });
    if (user && (await bcrypt.compare(body.password, user.password))) {
      const payload = { username: body.username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException("Check your credentials");
    }
  }
}
