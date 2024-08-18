import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BadRequestException, ValidationPipe, VersioningType } from "@nestjs/common";
import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";
import envConfig from "./database/environment";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as path from "path";
import * as fs from "fs";
import { useContainer, ValidationError } from "class-validator";
import { CORS } from "./common/cors/cors";

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const PORT = envConfig.PORT || 8000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix("api");

  const publicDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  app.useStaticAssets(path.join(__dirname, "..", "uploads"), {
    prefix: "/uploads",
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints).join(", "),
          })),
        );
      },
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors(CORS);

  const config = new DocumentBuilder()
    .setTitle("Ronalca API")
    .setDescription("The Ronalca API V1")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("users")
    .addTag("auth")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(PORT);

  console.log(`Server running on port ${PORT}`);
}
bootstrap();
