import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import envConfig from "@src/database/environment";
import { AuthService } from "./service/auth.service";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./strategy/jwtStrategy";
import { LocalStrategy } from "./strategy/localStrategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envConfig.JWT_SECRET,
      signOptions: { expiresIn: envConfig.JWT_EXPIRES_IN },
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
