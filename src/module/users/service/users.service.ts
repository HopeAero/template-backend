import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { PageOptionsDto } from "@src/common/dto/page.option.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Equal, Repository } from "typeorm";
import { PageDto } from "@src/common/dto/page.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.checkUserExistence(createUserDto.email);
    let { email, name, password } = createUserDto;

    password = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      name,
      password,
    });

    return this.userRepository.save(user);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const [result, total] = await this.userRepository.findAndCount({
      order: {
        createdAt: pageOptionsDto.order,
      },
      take: pageOptionsDto.perPage,
      skip: pageOptionsDto.skip,
    });

    return new PageDto(result, total, pageOptionsDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async checkUserExistence(email: string): Promise<void | never> {
    const emailUserExists = await this.userRepository.findOne({ where: { email: Equal(email) } });

    if (emailUserExists) {
      throw new BadRequestException("El correo ya está en uso");
    }
  }

  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: Equal(email) },
      select: ["uuid", "email", "password", "name"],
    });
  }

  public async findOneByUuid(uuid: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { uuid: Equal(uuid) },
      select: ["uuid", "email", "name"],
    });

    return user;
  }
}
