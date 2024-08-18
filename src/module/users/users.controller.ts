import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from "@nestjs/common";
import { UsersService } from "./service/users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PageOptionsDto } from "@src/common/dto/page.option.dto";
import { PageDto } from "@src/common/dto/page.dto";
import { User } from "./entities/user.entity";
import { ApiTags } from "@nestjs/swagger";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    return this.usersService.findAll(pageOptionsDto);
  }

  @Get(":id")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.usersService.findOneByUuid(uuid);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
