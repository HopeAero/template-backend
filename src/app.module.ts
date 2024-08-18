import { Global, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./module/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { NestjsFormDataModule } from "nestjs-form-data";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmAsyncConfig } from "./database/typeorm.config";
import { CustomFileStorage } from "./common/formData/formDataStorage";
import { UsersModule } from "./module/users/users.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthInterceptor } from "./common/interceptor/auth-interceptor";
import { IsUniqueConstraint } from "./common/decorator/is-unique-constriant.decorator";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "../uploads"),
      serveRoot: "/uploads/",
    }),
    NestjsFormDataModule.config({
      isGlobal: true,
      storage: CustomFileStorage,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IsUniqueConstraint,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
