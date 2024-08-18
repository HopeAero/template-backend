import { ApiProperty } from "@nestjs/swagger";
import { IsUnique } from "@src/common/decorator/is-unique";
import { IsDefined, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Rodrigo", required: true })
  @IsNotEmpty({})
  @IsDefined({})
  @IsString({})
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: "pasantia.19@gmail.com", required: true })
  @IsNotEmpty()
  @IsEmail({})
  @IsUnique({ column: "email", tableName: "user" })
  email: string;

  @ApiProperty({ example: "Contra2000", required: true })
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: "La contraseña es muy débil",
  })
  password: string;
}
