import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { ActiveUser } from "@src/common/decorator/active-user.decorator";
import { UserActiveInterface } from "@src/common/interface/user-active.interface";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() logindto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(logindto);
  }

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.register(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user.uuid);
  }
}
