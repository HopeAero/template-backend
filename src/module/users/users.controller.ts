import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Res } from "@nestjs/common";
import { UsersService } from "./service/users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PageOptionsDto } from "@src/common/dto/page.option.dto";
import { PageDto } from "@src/common/dto/page.dto";
import { User } from "./entities/user.entity";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    return this.usersService.findAll(pageOptionsDto);
  }

  @Get(":uuid")
  async findOne(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.usersService.findOneByUuid(uuid);
  }

  @Patch(":uuid")
  async update(@Param("uuid", ParseUUIDPipe) uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(":uuid")
  async remove(@Param("uuid", ParseUUIDPipe) uuid: string, @Res() res: Response) {
    await this.usersService.remove(uuid);
    return res.status(200).send("Usuario eliminado correctamente");
  }
}
