import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "@src/module/users/dto/create-user.dto";
import { User } from "@src/module/users/entities/user.entity";
import { UsersService } from "@src/module/users/service/users.service";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = { sub: user.uuid };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  async profile(uuid: string): Promise<User> {
    console.log(uuid);
    return this.userService.findOneByUuid(uuid);
  }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }
}
